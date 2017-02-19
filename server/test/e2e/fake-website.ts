// const express = require('express');
// const getPort = require('get-port');
// const Promise = require('bluebird');
// const prependHttp = require('prepend-http');
// const cors=require('cors');
// export default class FakeWebsite {
//   private app;
//   private server;
//   private host = 'localhost';
//   private port;
//   private name = 'unknown';
//   private endpoints = [
//     {
//       route:'webpage',
//       method: FakeWebsite.GET,
//       response: 'hello world'
//     }
//   ];
//   private static GET: string = 'get';
//   constructor() {
//     this.usePlugins();
//     this.registerEndpoints();
//
//   }
//   getPort() {
//     if (this.port) return Promise.resolve(this.port);
//     return getPort().then((port) => {
//       this.port = port;
//       return port;
//     });
//   }
//   getUri() {
//     return this.getPort().then((port) => {
//       return prependHttp(this.host + ':' + port);
//     });
//   }
//   start() {
//
//     return this.startListening();
//   }
//   private startListening() {
//     return this.getPort().then((port) => {
//       this.server = this.app.listen(port, () => {
//         console.log('fake website named ' + this.name + ' listening on port ' + port);
//       });
//     });
//   }
//   private registerEndpoints() {
//     this.endpoints.forEach((endpoint)=>{
//       this.route(endpoint.method, endpoint.route, endpoint.response)
//     });
//   }
//   private route(method, url, response) {
//     this.app[method](url, (req, res) => {
//       res.send(response);
//     });
//   }
//   hasReceivedRequestFor(endpoint: string) {
//
//   }
//
//   private usePlugins() {
//     this.app.use(cors());
//   }
// }
