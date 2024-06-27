@echo off

REM Ruta base del proyecto
SET BASE_DIR=G:\ARCHIVOS\Descargas\University-Projects\SimuladorFinanciero

REM Función para iniciar el frontend
:start_frontend
echo Iniciando frontend...
cd /d %BASE_DIR%\frontend
start cmd /k "npm install && npm run dev"
exit /b

REM Función para iniciar el backend
:start_backend
echo Iniciando backend...
cd /d %BASE_DIR%\backend
rmdir /s /q venv
python -m venv venv
call venv\Scripts\activate.bat
cd src
pip install -r requirements.txt
python run.py
exit /b

REM Iniciar frontend y backend en paralelo
start "" cmd /c call :start_frontend
start "" cmd /c call :start_backend

REM Esperar a que ambos procesos terminen
pause