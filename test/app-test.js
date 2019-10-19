import request from 'supertest';
import sinon from 'sinon';
import * as server from '../app';


describe('App Server', () => {
    it('Ping route', (done) => {
        let setupServerSpy = sinon.spy(server, 'setupServer');
        server.setupServer(false);
        setupServerSpy.restore();
        request(server.app).get('/ping').expect('ok').expect(200).end(done);
    });
});
