#!/bin/sh

echo "⏳ Esperando a que la base de datos responda en ${DB_HOST}:${DB_PORT}..."
until nc -z ${DB_HOST} ${DB_PORT}; do
  echo "🕐 Esperando a ${DB_HOST}:${DB_PORT}..."
  sleep 3
done


echo "🚀 Corriendo migraciones..."
pnpm migration:run-dev

echo "▶️ Iniciando aplicación NestJS..."
node dist/main.js
