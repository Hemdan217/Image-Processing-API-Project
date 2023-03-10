"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// eslint-disable-next-line import/no-unresolved, import/extensions
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('1. Test endpoint responses', () => {
    it('1.1 gets the placeholder endpoint', async (done) => {
        const response = await request.get('/placeholder');
        expect(response.status).toBe(200);
        done();
    });
    it('1.2 gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    });
    it('1.3 gets the api endpoint', async (done) => {
        const response = await request.get('/upload');
        expect(response.status).toBe(200);
        done();
    });
    it('1.4 gets the api endpoint', async (done) => {
        const response = await request.get('/generate');
        expect(response.status).toBe(200);
        done();
    });
});
