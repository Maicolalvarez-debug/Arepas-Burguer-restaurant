#!/usr/bin/env bash
set -e
echo "============================================="
echo "  Arepas Burguer - Instalador (Linux/Mac)"
echo "============================================="
echo
echo "Requisitos: Node.js 18+ (https://nodejs.org/)"
echo
cd "$(dirname "$0")/.."
npm install
if [ ! -f ".env" ]; then cp .env.example .env; fi
npm run db:push
npm run db:seed
npm run dev
