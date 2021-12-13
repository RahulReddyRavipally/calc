import {Application} from 'express';
import {default as request} from 'supertest';
import {Container, Scope} from 'typescript-ioc';

import {HelloWorldApi} from '../../src/services';
import {buildApiServer} from '../helper';

class MockHelloWorldService implements HelloWorldApi {
  calc = jest.fn().mockName('greeting');
}

describe('hello-world.controller', () => {

  let app: Application;
  let mockGreeting: jest.Mock;

  beforeEach(() => {
    const apiServer = buildApiServer();

    app = apiServer.getApp();

    Container.bind(HelloWorldApi).scope(Scope.Singleton).to(MockHelloWorldService);

    const mockService: HelloWorldApi = Container.get(HelloWorldApi);
    mockGreeting = mockService.calc as jest.Mock;
  });

  test('canary validates test infrastructure', () => {
    expect(true).toBe(true);
  });

  describe('Given /add', () => {
    const expectedResponse = 'Hello there!';

    beforeEach(() => {
      mockGreeting.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "Hello, World!"', done => {
      request(app).get('/add').expect(200).expect(expectedResponse, done);
    });
    
  });

  describe('Given /sub', () => {
    const expectedResponse = 'Hello there!';

    beforeEach(() => {
      mockGreeting.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "Hello, World!"', done => {
      request(app).get('/sub').expect(200).expect(expectedResponse, done);
    });
    
  });
  describe('Given /mult', () => {
    const expectedResponse = 'Hello there!';

    beforeEach(() => {
      mockGreeting.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "Hello, World!"', done => {
      request(app).get('/mult').expect(200).expect(expectedResponse, done);
    });
    
  });
  describe('Given /div', () => {
    const expectedResponse = 'Hello there!';

    beforeEach(() => {
      mockGreeting.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "Hello, World!"', done => {
      request(app).get('/div').expect(200).expect(expectedResponse, done);
    });
    
  });
  




});
