@echo off
SETLOCAL

REM Ruta base del proyecto
SET BASE_DIR=C:\Users\Asus\OneDrive\Documentos\Programacion\Web\Proyecto\SimuladorFinanciero

REM Iniciar el frontend en una nueva ventana de comandos
echo Iniciando frontend...
cd /d "%BASE_DIR%\frontend"
start cmd /k "npm run dev"

REM Iniciar el backend en una nueva ventana de comandos
echo Iniciando backend...
cd /d "%BASE_DIR%\backend"
start cmd /k "call venv\Scripts\activate.bat && cd src && python run.py"

REM Esperar a que ambos procesos terminen
pause