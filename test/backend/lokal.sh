#!/usr/bin/env bash
# Backend-Tests gegen eine frische, lokale Postgres-Instanz (keine Verbindung zu Supabase).
# Voraussetzung: PostgreSQL 15 oder neuer ist installiert (initdb, pg_ctl, psql). Nicht als root starten.
# Aufruf im Repo-Ordner: bash test/backend/lokal.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
BIN=$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)
BIN=${BIN:-$(dirname "$(command -v initdb)")}
DIR=$(mktemp -d)
PORT=54329
aufraeumen() { "$BIN/pg_ctl" -D "$DIR/data" stop -m fast >/dev/null 2>&1 || true; rm -rf "$DIR"; }
trap aufraeumen EXIT

"$BIN/initdb" -D "$DIR/data" -U postgres -A trust >/dev/null
"$BIN/pg_ctl" -D "$DIR/data" -o "-k $DIR -p $PORT -c listen_addresses=''" -l "$DIR/log" -w start >/dev/null
P=("$BIN/psql" -h "$DIR" -p "$PORT" -U postgres -d postgres -v ON_ERROR_STOP=1 -q -X)

"${P[@]}" -f test/backend/supabase_stub.sql
# pg_cron gibt es lokal nicht, cron.schedule ist im Stub nachgebildet
grep -v 'create extension if not exists pg_cron' backend/schema.sql | "${P[@]}"
"${P[@]}" -f backend/freigaben.sql
"${P[@]}" -f backend/2026-11-absichern.sql
"${P[@]}" -f backend/migrationen/2026-11-protokoll-pilot.sql
"${P[@]}" -f backend/haertung.sql
"${P[@]}" -t -A -f test/backend/backend_tests.sql | grep -v "^$"
"${P[@]}" -t -A -f test/backend/protokoll_tests.sql | grep -v "^$"
echo "Alle Backend-Tests bestanden."
