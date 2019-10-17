import request from 'supertest';
import app from '../app';


describe('App Server', () => {
    it('Ping route', (done) => {
        request(app).get('/ping').expect('ok').expect(200).end(done);
    });
});
