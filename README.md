IoT-Enabled Student Attendance Tracking
Overview
This project is an IoT-based system designed to automate attendance tracking for students using RFID technology. The system reduces manual effort, improves accuracy, and supports real-time monitoring through a web-based interface.

Features
Automated attendance tracking using RFID modules.
Real-time attendance logs and reports.
Backend developed with Node.js and Express.js.
Frontend built using React.js for an intuitive UI.
Data storage and management with MySQL.
Server-controller communication using MQTT for reliability.
Technology Stack
Backend: Node.js, Express.js
Frontend: React.js
Database: MySQL
Communication Protocol: MQTT
Hardware: RFID modules, Microcontrollers
Setup Instructions
Clone the repository:
bash
Copy code
git clone https://github.com/khemanthvijay/<repo-name>.git  
Install backend dependencies:
bash
Copy code
cd backend  
npm install  
Install frontend dependencies:
bash
Copy code
cd frontend  
npm install  
Set up MySQL database and update environment variables in .env.
Start the development server:
bash
Copy code
npm start  
Usage
Swipe an RFID card to log attendance.
View attendance records and reports in the React-based web application.
Future Improvements
Add facial recognition as a secondary authentication method.
Enable cloud storage for scalability.
License
This project is licensed under the MIT License.
