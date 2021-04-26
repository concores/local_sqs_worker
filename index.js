'use strict;'

const { default: axios } = require('axios');
const { SqsPoller } = require('@jishimi/sqs-poller');

require('dotenv').config();

const forwardToServer = async (payload) => {
    console.log(`Posting...`);
    return axios.post(process.env.API_ENDPOINT, payload)
    .then(res => {
        console.log(`HTTP status: ${res.status} ${res.statusText}`);
        console.log(res.data);
        //console.debug(res);
    })
    .catch(err => {
        console.error(err);
    });
};

const poller = new SqsPoller(process.env.QUEUE_URL, async (msg) => {
    console.log(`Message recieved`);
    await forwardToServer(msg);
});

poller.on('error', (err) => console.error(err));

console.info(`Polling ${process.env.QUEUE_URL}`);
console.info(`Forwarding to ${process.env.API_ENDPOINT}`);

poller.start();