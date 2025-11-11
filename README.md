Peer Tutoring Platform

A full-stack web application designed to connect students with tutors for personalized peer tutoring sessions. Users can register as students or tutors, view and update profiles, and browse all registered users.

Table of Contents

Project Overview

Features

Technologies

Backend API

Frontend Application

Installation

Usage

Environment Variables

License

Project Overview

The Peer Tutoring Platform allows:

Students to find tutors by name and role

Tutors to manage profiles, list subjects and bio

Admins (future feature) to manage users

The project consists of:

Backend: Node.js, Express.js, MongoDB, JWT authentication

Frontend: React.js, React Router, TailwindCSS

Features
Authentication

User registration (student/tutor)

Login with JWT token

Logout

User Management

View own profile

Update profile (name, email, password)

Browse all users

View individual user profiles

Security

JWT-based authentication

Protected routes for sensitive data

Password hashing with bcrypt

Technologies

Backend

Node.js

Express.js

MongoDB / Mongoose

JSON Web Token (JWT)

bcrypt.js

dotenv

Frontend

React.js

Axios

React Router DOM

Tailwind CSS

Backend API

Base URL: https://final-project-plp-gucn.onrender.com/api

Authentication Routes
Method	Route	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
User Routes
Method	Route	Description	Auth
GET	/users/profile	Get logged-in user profile	Yes
PUT	/users/profile	Update logged-in user profile	Yes
GET	/users	Get all users (admin purpose)	Yes
GET	/users/:id	Get user by ID	Yes

Example Request Header

Authorization: Bearer <token>

Frontend Application

The frontend of the application is deployed at:

Peer Tutoring Platform Frontend

Features include:

Interactive user interface

Profile management forms

Navigation for all users and individual profiles

Responsive design with TailwindCSS

Installation (Local Setup)
Backend

Clone the repository:

git clone <backend-repo-url>


Install dependencies:

cd backend
npm install


Create .env file with:

MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d


Run the server:

npm run dev

Frontend

Navigate to frontend folder and install dependencies:

cd client
npm install


Create .env file with:

VITE_API_URL=http://localhost:5000/api


Run the frontend:

npm run dev


Open http://localhost:5173 in your browser

Usage

Register as a student or tutor

Login using registered credentials

Navigate to All Users to see all users

Click a user to view their profile

Update your own profile using My Profile

License

MIT License © 2025