import { Container } from "typescript-ioc";

export * from './calc.api';
export * from './calc.service';

import config from './ioc.config';

Container.configure(...config);