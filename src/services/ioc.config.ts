import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {HelloWorldApi} from './calc.api';
import {HelloWorldService} from './calc.service';

const config: ContainerConfiguration[] = [
  {
    bind: HelloWorldApi,
    to: HelloWorldService,
    scope: Scope.Singleton
  }
];

export default config;