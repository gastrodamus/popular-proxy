const newrelic = require('newrelic');
const express = require ('express');
const PORT = 5001;
const app = express();
const path = require('path'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

app.use(morgan('dev'));
app.get('/loaderio-75c9f15d0646eea48e873c56689d21f7', (req, res) => {
    res.status(200).send('loaderio-75c9f15d0646eea48e873c56689d21f7');
  });
app.use('/:id', express.static(path.join(__dirname, '/../client')));

// const gallery = 'http://localhost:3000';
// const reservation = 'http://localhost:3001';

// change the url to aws url to deploy the service on ec2 
//const popular = 'http://ec2-18-219-238-206.us-east-2.compute.amazonaws.com:3002';
const popular = 'http://localhost:3002';

// const header = 'http://localhost:3003';

// app.all('/gallery/:id', function(req, res) {
//     console.log('redirecting to gallery');
//     proxy.web(req, res, { target: gallery });
// });

// app.all('/reservation/:id', function(req, res) {
//     console.log('redirecting to reservation');
//     proxy.web(req, res, { target: reservation });
// });

app.all('/api/popularDish/:id', function(req, res) {
    console.log('redirecting to popular');
    proxy.web(req, res, { target: popular });
});

// app.all('/header/:id', function(req, res) {
//     console.log('redirecting to header');
//     proxy.web(req, res, { target: header });
// });

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
