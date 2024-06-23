import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js' // Assume this is where your express app is defined
import User from '../models/UserSchema.js';
import dotenv from 'dotenv'
dotenv.config()

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('User Controller', () => {

    let userId;

    describe('POST /register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    name: 'Test User',
                    age: 30,
                    city: 'Test City',
                    zipCode: '12345',
                    password: 'Test1234'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User Resgistered Successfully');
            expect(response.body.user).toHaveProperty('_id');
            userId = response.body.user._id;
        });

        it('should not register a user with missing fields', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test2@example.com'
                    // missing other fields
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Please provide all details');
        });

        it('should not register a user with an invalid email', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'invalidEmail',
                    name: 'Test User',
                    age: 30,
                    city: 'Test City',
                    zipCode: '12345',
                    password: 'Test1234'
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid email format');
        });

        it('should not register a user with an existing email', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    name: 'Another User',
                    age: 25,
                    city: 'Another City',
                    zipCode: '67890',
                    password: 'Another1234'
                });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('User with this email already exists');
        });
    });

    describe('GET /getAllUsers', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/getAllUser');

            expect(response.status).toBe(200);
            expect(response.body.succes).toBe(true);
            expect(response.body.message).toBe('User Profile');
            expect(response.body.user.length).toBeGreaterThan(0);
        });
    });

    describe('GET /getProfileById/:id', () => {
        it('should get a user by ID', async () => {
            const response = await request(app)
                .get(`/getProfileById/${userId}`);

            expect(response.status).toBe(200);
            expect(response.body.succes).toBe(true);
            expect(response.body.message).toBe('User Profile');
            expect(response.body.user).toHaveProperty('_id', userId);
        });
    });

    describe('PUT /updateProfile/:id', () => {
        it('should update a user profile', async () => {
            const response = await request(app)
                .put(`/updateProfile/${userId}`)
                .send({
                    name: 'Updated User',
                    age: 35
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Profile updated successfully');

            const updatedUser = await User.findById(userId);
            expect(updatedUser.name).toBe('Updated User');
            expect(updatedUser.age).toBe(35);
        });
    });

    describe('DELETE /deleteProfile/:id', () => {
        it('should delete a user profile', async () => {
            const response = await request(app)
                .delete(`/deleteProfile/${userId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Profile Deleted successfully');

            const deletedUser = await User.findById(userId);
            expect(deletedUser).toBeNull();
        });
    });
});
