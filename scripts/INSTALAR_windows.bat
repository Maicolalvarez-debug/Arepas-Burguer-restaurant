@echo off
title Arepas Burguer - Instalador (Windows)
echo =============================================
echo   Arepas Burguer - Instalador automatico
echo =============================================
echo.
echo Requisitos: Node.js 18 o superior.
echo Si no tienes Node instalado, descargalo desde https://nodejs.org/
echo.
pause
cd /d "%~dp0.."
echo Instalando dependencias...
call npm install --legacy-peer-deps || goto :error
echo Copiando .env...
if not exist ".env" copy ".env.example" ".env"
echo Inicializando base de datos...
call npm run db:push || goto :error
call npm run db:seed || goto :error
echo Iniciando servidor en http://localhost:3000 ...
call npm run dev
goto :EOF
:error
echo.
echo Hubo un error durante la instalacion. Revisa el mensaje de arriba.
pause
