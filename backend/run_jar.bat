@echo off
set "JAVA_HOME=E:\USER\Favorites\Downloads\jdk-17.0.17_windows-x64_bin\jdk-17.0.17"
set "PATH=%PATH%;E:\USER\Favorites\Downloads\maven-mvnd-1.0.3-windows-amd64\maven-mvnd-1.0.3-windows-amd64\mvn\bin"
call mvn clean package -DskipTests > build_output.txt 2>&1
if %errorlevel% neq 0 (
    echo BUILD FAILED
    type build_output.txt
    exit /b %errorlevel%
)
echo BUILD SUCCESS
java -jar target/skilldecaydetector-0.0.1-SNAPSHOT.jar
