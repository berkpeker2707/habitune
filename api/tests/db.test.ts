const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server.ts')

const dotenv = require('dotenv')
dotenv.config({ path: './api/.env' })

describe('GET /privacy', () => {
    it('should return privacy', async () => {
        const res = await request(app)
            .get('/privacy')
            .expect(200)
            .expect(res.statusCode)
            .toBe(200)
    })
})
