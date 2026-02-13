# Skill Decay Predictor

A full-stack web application designed to help users track their skills, predict skill decay over time, and maintain proficiency through AI-generated assessments and gamified learning.

##  Features

- **Skill Tracking**: Visual dashboard to monitor skill levels and history.
- **Decay Prediction**: intelligent algorithms to estimate how skills fade over time based on inactivity.
- **AI-Powered Assessments**: Generate custom quizzes and coding challenges using AI (OpenAI integration) to reinforce learning.
- **Gamification**:
  - **Leaderboards**: Compete with other users based on learning activity and assessment scores.
  - **Achievements & Notifications**: Get alerted when skills are at risk of decaying.
- **User Progression**: Track history, view graphs of skill retention, and earn roles/badges.
- **Secure Authentication**: Robust user management with JWT and OAuth2 support.

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.4.2
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security, JWT, OAuth2 Client
- **Data Access**: Spring Data JPA, Hibernate
- **AI Integration**: OpenAI API (for generating questions)
- **Build Tool**: Maven

### Frontend
- **Framework**: React (Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: CSS (Custom & Responsive)
- **Visualization**: Chart.js / React-Chartjs-2
- **Routing**: React Router DOM
- **HTTP Client**: Axios

##  Prerequisites

Before running the project, ensure you have the following installed:
- **Java Development Kit (JDK) 17** or higher
- **Node.js** (LTS version recommended)
- **MySQL Server**
- **Maven** (optional, if using the included wrapper/IDE)

##  Installation & Setup

### 1. Database Setup
1. Open your MySQL client (Workbench, Command Line, etc.).
2. Create the database:
   ```sql
   CREATE DATABASE skilldecaypredictor;
   ```
3. Configure your database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure API Keys:
   - Open `src/main/resources/application.properties`.
   - Add your OpenAI API key and Email credentials if required for full functionality.
3. Build and Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start at `http://localhost:8080`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
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
   The frontend application will be available at `http://localhost:5173`.

##  Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


