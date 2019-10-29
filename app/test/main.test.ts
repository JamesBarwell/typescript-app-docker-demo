import request from 'supertest';
import { app } from '../src/app';

import * as sourceApi from '../src/source/api';

describe('App', () => {
    let fetchIpAddressSpy: any;

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('when API is healthy', () => {
        beforeEach(() => {
            fetchIpAddressSpy = jest.spyOn(sourceApi, 'fetchIpAddress').mockImplementation(() => {
                return Promise.resolve({
                    ip: '123.123.123.123',
                });
            });
        });

        describe('GET /', () => {
            let response: any;

            beforeEach(async () => {
                response = await request(app).get('/');
            });

            it('should respond 200', () => expect(response.statusCode).toBe(200));

            it('should fetch the API once', () => expect(fetchIpAddressSpy.mock.calls.length).toBe(1));

            it('should respond with the IP address in the body', () =>
                expect(response.text).toEqual('My IP is: 123.123.123.123'));
        });
    });

    describe('when API is down', () => {
        beforeEach(() => {
            fetchIpAddressSpy = jest.spyOn(sourceApi, 'fetchIpAddress').mockImplementation(() => {
                return Promise.reject(new Error('Could not resolve host'));
            });
        });

        describe('GET /', () => {
            let response: any;

            beforeEach(async () => {
                response = await request(app).get('/');
            });

            it('should respond 500', () => expect(response.statusCode).toBe(500));
        });
    });
});
