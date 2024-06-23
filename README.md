# User Management API

This is a User Management API built with Node.js, Express, and MongoDB. It provides endpoints to register, retrieve, update, and delete user profiles.

## Table of Contents
- Installation
- Usage
- Endpoints
- Running Tests
- Environment Variables
- Contributing

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JatinDhamija816/worko/
   cd server
2. Install dependencies:
   ```bash
   npm i
3. Create a .env file in the root directory and add your MongoDB connection URL:
   ```bash
   PORT = 8000
   MONGODB_URI = your_mongodb_url
## Usage
1. Start the server:
   ```bash
   npm start
2. The server will be running at http://localhost:8000.

## Endpoints
### Register a New User
- URL:`/register'
- Method:'POST'
- Body:
  ```json
  {
    "email": "test@example.com",
    "name": "Test User",
    "age": 30,
    "city": "Test City",
    "zipCode": "12345",
    "password": "Test1234"
  }
- Success Response
  - Code:200
  - Content
    ```json
    {
      "success": true,
      "message": "User Registered Successfully",
      "user": {
          "_id": "60d5ec49b2a35442bcd1a623",
          "email": "test@example.com",
          "name": "Test User",
          "age": 30,
          "city": "Test City",
          "zipCode": "12345",
          "password": "$2b$10$...",
          "__v": 0
      }
    }
### Get All Users
- URL:`/getAllUser'
- Method:'GET'
- Success Response
  - Code:200
  - Content:
    ```json
    {
      "success": true,
      "message": "User Profile",
      "user": {
          "_id": "60d5ec49b2a35442bcd1a623",
          "email": "test@example.com",
          "name": "Test User",
          "age": 30,
          "city": "Test City",
          "zipCode": "12345",
          "password": "$2b$10$...",
          "__v": 0
      }
    }
### Get User by ID
- URL:`/user/:id'
- Method:'GET'
- Success Response
  - Code:200
  - Content:
    ```json
    {
      "success": true,
      "message": "User Profile",
      "user": {
          "_id": "60d5ec49b2a35442bcd1a623",
          "email": "test@example.com",
          "name": "Test User",
          "age": 30,
          "city": "Test City",
          "zipCode": "12345",
          "password": "$2b$10$...",
          "__v": 0
      }
    }
### Update User Profile
- URL:`/user/:id'
- Method:'PUT'
- Body:(Optional fields)
- ```json
  {
    "email": "updated@example.com",
    "name": "Updated User",
    "age": 35,
    "city": "Updated City",
    "zipCode": "67890",
    "password": "Updated1234"
  }
- Success Response
  - Code:200
  - Content:
    ```json
    {
      "success": true,
      "message": "Profile updated successfully",
    }
### Delete User Profile
- URL:`/user/:id'
- Method:'DELETE'
- Success Response
  - Code:200
  - Content:
    ```json
    {
      "success": true,
      "message": "Profile Deleted successfully",
    }
## Running Tests
To run the test suite, use the following command:
   ```bash
   npm test
