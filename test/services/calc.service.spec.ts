import {Container} from 'typescript-ioc';

import {HelloWorldService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Hello World service', () =>{

  let app: ApiServer;
  let service: HelloWorldService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(HelloWorldService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });


    context('when no name provided', () => {

      test('then return "II"', async () => {
        expect(await service.calc('add','I,I')).toEqual('II');
        
      });
      test('then return "VI"', async () => {
        expect(await service.calc('sub','IX,III')).toEqual('VI');
        
      });
    })
  });
