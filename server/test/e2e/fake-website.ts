const express = require('express');
const getPort = require('get-port');

const Promise = require('bluebird');
const prependHttp = require('prepend-http');
const cors=require('cors');
const vhost=require('vhost');
export default class FakeWebsite {
  private app=express();
  private server;
  private port;
  private host='localhost';
  private endpoints = [
    {
      route:'/webpage',
      method: FakeWebsite.GET,
      reply: 'hello world'
    }
  ];
  private static GET: string = 'get';
  private static POST: string = 'post';

  constructor(private domain:string) {
    this.usePlugins();
    this.registerEndpoints();

  }
  getPort() {
    if (this.port) return Promise.resolve(this.port);
    return getPort().then((port) => {
      this.port = port;
      return port;
    });
  }
  private getUri() {
    return this.getPort().then((port) => {
      return prependHttp(this.domain + ':' + port);
    });
  }
  start() {
    return this.startListening();
  }
  private startListening() {
    return new Promise((resolve, reject)=>{
      this.getPort().then((port) => {
        this.server = this.app.listen(port, () => {
          console.log(this.domain+ ' is listening on port ' + port);
          resolve();

        });
      });
    });

  }
  private registerEndpoints() {
    this.endpoints.forEach((endpoint)=>{
      this.registerEndpoint(endpoint.method, endpoint.route, endpoint.reply);
    });
  }
  private registerEndpoint(method, route, response) {
    this.app[method](route, (req, res) => {
      res.send(response);
    });
  }
  hasReceivedRequest(endpoint: string) {
  }

  private usePlugins() {
    this.app.use(vhost(this.domain, (req, res)=>{
      console.log(this.domain+' received request');
    }));
    this.app.use(cors());
  }

  reply(route: string, response: string) {

  }

  getDomain() {
    return this.domain;
  }
}
