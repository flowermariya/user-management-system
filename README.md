# User Management System

This User Management System is a robust and scalable API built using Node.js, Express, MongoDB, and integrated with AWS S3. It's designed to handle various user-related functionalities, including user registration, profile updates, and secure image storage.

## Features

- **User Registration and Authentication**: Securely register and authenticate users.
- **Profile Management**: Users can update their profiles and manage personal details.
- **Image Storage with AWS S3**: Store and retrieve user profile images securely.
- **Secure and Scalable**: Built with security and scalability in mind.

## Technologies Used

- Node.js with Express for the backend framework.
- MongoDB as the database, with Mongoose for data modeling.
- AWS SDK for S3 integration to handle file storage.
- JSON Web Tokens (JWT) for secure authentication.
- Bcryptjs for password hashing.
- Class-validator for data validation.
- Multer for handling file uploads.

## Development Dependencies

- Babel for using TypeScript with Express.
- Nodemon for auto-reloading during development.
- TypeScript for static type checking.
- ts-node for executing TypeScript scripts.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- AWS Account (for S3 Bucket access)

### Installation

1. Clone the repository
2. cd user_management_system
3. npm install
4. Create .env file using sample .env.template file
5. Build the project: npm run build
6. Start the server: npm start
7. For development, you can use: npm run start:dev
