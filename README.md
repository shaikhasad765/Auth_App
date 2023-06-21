# Authentication Web App Boat Theme

A Node.js web app that provides user authentication functionality, including user signup and signin. It uses popular frameworks and libraries such as Express.js, Passport.js, and MongoDB for efficient and secure user authentication.

## Project Usage

### System Requirements
- Node.js (version 12 or higher)
- MongoDB Atlas (Cloud-based MongoDB database)

### Installation
1. Install Node.js by following the instructions at https://nodejs.org.
2. Sign up for a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas if you don't have one already.
3. Create a new project in MongoDB Atlas and set up a cluster for your app. Obtain the connection string for your cluster.

### Configuration
1. `MONGODB_URI`: Set this variable to the MongoDB Atlas connection string obtained in the previous step.

### Starting the App
1. Open a terminal or command prompt and navigate to the project's main directory.
2. Run the command `npm install` to install the project dependencies.
3. Run the command `npm start` to start the project.
4. The app will now be running on port 8000.
5. Open your web browser and visit `http://localhost:8000` to access the web application.

### Registration Note
- To register, use an email address which actually exist so that the alert and temporary passwords can be sent to email

## User Guide
- Once the app is running, users can register with their email addresses to create accounts.
- Users should log in to the app using their registered email and password.
- After logging in, users can see their profiles, change password, send temp password to mail if password is forgotton

## Features
- User signup: Allows users to create new accounts.
- User signin: Authenticates users and grants access to protected resources.
- Password hashing: User passwords are securely hashed and stored in the database.
- Session management: Uses session-based authentication to maintain user sessions.
- Input validation: Validates user inputs to ensure data integrity.
- Flash messages: Provides informative messages to users about successful or failed operations.
- Error handling: Catches and handles errors to provide a smooth user experience.
- Security: Protects against common security vulnerabilities such as cross-site scripting (XSS) and cross-site request forgery (CSRF).


For any questions or issues, please contact Asadullah Shaikh at shaikhasad765@gmail.com.

