import assert from 'assert';
import sinon from 'sinon';
import request from 'supertest';

import Log from "../src/log";
import App from '../src/app';

function startApp(opts: any = {}) {
    const log = Log();

    const apiSource = opts.apiSource || {
        fetchIpAddress: sinon.stub().resolves({
            ip: '123.123.123.123',
            location: 'UK',
        }),
    };

    const app = App(
        log,
        apiSource,
    );

    return {
        app,
        apiSource,
    };
}

describe('App', () => {
    context('when API is healthy', () => {
        describe('GET /', () => {
            let response: any;
            let app: any;
            let apiSource: any;

            beforeEach(async () => {
                ({ app, apiSource } = startApp());
                response = await request(app).get('/');
            });

            it('should fetch the API once', () => (
                sinon.assert.calledOnce(apiSource.fetchIpAddress)
            ));

            it('should respond 200', () => (
                assert.equal(response.statusCode, 200)
            ));

            it('should respond with the IP address in the body', () => (
                assert.equal(response.text, 'My IP is: 123.123.123.123')
            ));
        });
    });

    context('when API is down', () => {
        describe('GET /', () => {
            let response: any;
            let app;

            beforeEach(async () => {
                const apiSourceFailure = {
                    fetchIpAddress: sinon.stub().rejects(new Error('500')),
                };
                ({ app } = startApp({
                    apiSource: apiSourceFailure,
                }));
                response = await request(app).get('/');
            });

            it('should respond 200', () => (
                assert.equal(response.statusCode, 500)
            ));
        });
    });
});
