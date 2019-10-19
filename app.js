'use strict';
import cluster from 'cluster';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import router from './router';
import { signUpStrategy, loginStrategy, verifyToken } from './modules/auth/auth-stratergy';

mongoose.Promise = global.Promise;


process.on('unhandledRejection', (rejectionErr) => {
    // Won't execute
    console.log('unhandledRejection Err::', rejectionErr);
    console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr.stack));
});

process.on('uncaughtException', (uncaughtExc) => {
    console.log('uncaughtException Err::', uncaughtExc);
    console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack));
});


const app = express();
let workers = [];


/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
    // to read number of cores on system
    let numCores = require('os').cpus().length;
    console.log('Master cluster setting up ' + numCores + ' workers');

    // iterate on number of cores need to be utilized by an application
    // current example will utilize all of them
    for(let i = 0; i < numCores; i++) {
        // creating workers and pushing reference in an array
        // these references can be used to receive messages from workers
        workers.push(cluster.fork());

        // to receive messages from worker process
        workers[i].on('message', function(message) {
            console.log(message);
        });
    }

    // process is clustered on a core and process id is assigned
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is listening');
    });

    // if any of the worker process dies then start a new one by simply forking another one
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        workers.push(cluster.fork());
        // to receive messages from worker process
        workers[workers.length-1].on('message', function(message) {
            console.log(message);
        });
    });

    cluster.on('listening', (worker, address) => {
        console.log(`A worker is now connected to ${address.address}:${address.port}`);
    });
};

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
const setUpExpress = () => {
    mongoose.connect('mongodb://localhost:27017/assignment', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch( error => {
        console.log(error);
    });

    const port = 3000;

    // Parse http application/json variables
    //app.use(bodyParser.json());

    // Parse http x-www-form-urlencoded variables
    app.use(bodyParser.urlencoded({extended: true}));



    app.use(passport.initialize());

    passport.use('signup', signUpStrategy);

    passport.use('signin', loginStrategy);

    passport.use(verifyToken);

    app.use('/api', router);

    app.use('/ping', (req, res) => {
        res.status(200).send('ok');
    });

    app.listen(port, () => `Server running on port ${port}!`);
};

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */
const setupServer = (isClusterRequired) => {

    // if it is a master process then call setting up worker process
    if(isClusterRequired && cluster.isMaster) {
        setupWorkerProcesses();
    } else {
        // to setup server configurations and share port address for incoming requests
        setUpExpress();
    }
};

setupServer(true);

export { 
    app,
    setupServer
};