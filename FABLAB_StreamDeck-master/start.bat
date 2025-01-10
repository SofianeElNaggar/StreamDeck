@echo off
cd .\server\
start "" "firefox.exe" "http://localhost:3000"
node server.mjs
