# Skill Decay Predictor - Run Instructions

## Prerequisites
- **Java 21** or later
- **Maven**
- **Node.js** (latest LTS recommended)
- **MySQL Database**

## 1. Database Setup
The backend is configured to connect to a MySQL database named `skilldecaypredictor`.

1. Open your MySQL client (Workbench, Command Line, etc.).
2. Create the database:
   ```sql
   CREATE DATABASE skilldecaypredictor;
   ```
3. Update `src/main/resources/application.properties` if your MySQL credentials differ from the defaults:
   - **Username**: `root`
   - **Password**: `Hari@ff555` (You should change this to match your local setup)

> **Note**: The application is configured to automatically update the schema (`spring.jpa.hibernate.ddl-auto=update`).

## 2. Backend (Spring Boot)
1. Open a terminal in the root directory (where `pom.xml` is located).
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   Alternatively, you can build the JAR and run it:
   ```bash
   mvn clean package
   java -jar target/skilldecaydetector-0.0.1-SNAPSHOT.jar
   ```
The backend will start on **port 8080** (default).

## 3. Frontend (React + Vite)
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will typically start on **http://localhost:5173**.

## Important Configuration Notes
- **API Keys**: The `application.properties` file contains API keys (OpenAI, Email). Ensure these are valid or replace them with your own. **Do not commit these secrets to a public repository.**
- **JWT Secret**: The `jwt.secret` is configured in `application.properties`.
