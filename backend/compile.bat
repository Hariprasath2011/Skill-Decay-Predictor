@echo off
set "JAVA_HOME=E:\USER\Favorites\Downloads\jdk-17.0.17_windows-x64_bin\jdk-17.0.17"
set "PATH=%PATH%;E:\USER\Favorites\Downloads\maven-mvnd-1.0.3-windows-amd64\maven-mvnd-1.0.3-windows-amd64\mvn\bin"
call mvn clean compile > build_log.txt 2>&1
type build_log.txt
