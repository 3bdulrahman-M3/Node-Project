# Todo List App

## Overview
This project is a Todo List application built with Node.js and Express. It features user authentication using JWT (JSON Web Tokens) and allows users to manage their todo items securely.

## Features
- User registration and login using phone number and password.
- JWT-based authentication for secure access to todo management routes.
- Ability to create, read, update, and delete todo items.

## Project Structure
```
todo-list-app
├── src
│   ├── controllers
│   │   └── authController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── app.js
│   └── config.js
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-list-app.git
   ```
2. Navigate to the project directory:
   ```
   cd todo-list-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
Before running the application, ensure to set up your environment variables for JWT secret and database connection in the `src/config.js` file.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Use the following endpoints for authentication:
   - **Register User**
     - `POST /auth/register`
     - Request body:
       ```json
       {
           "phone": "+201010558259",
           "password": "123456",
           "displayName": "Morad Abdelgaber",
           "experienceYears": 10,
           "address": "Mit ghamr, Dakahlia, Egypt",
           "level": "senior"
       }
       ```
   - **Login User**
     - `POST /auth/login`
     - Request body:
       ```json
       {
           "phone": "+201010558259",
           "password": "123456"
       }
       ```

3. Access todo routes (protected):
   - Ensure to include the JWT token in the Authorization header for requests to todo routes.

## License
This project is licensed under the MIT License.