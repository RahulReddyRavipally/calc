import {GET, Path, PathParam, QueryParam} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {HelloWorldApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/')
export class HelloWorldController {

  @Inject
  service: HelloWorldApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('HelloWorldController');
  }
 @Path('/add')
  @GET
  async addToUnknownUser(@QueryParam('operands')operands : string): Promise<string> {
    this.logger.info('Saying hello to someone');
    return this.service.calc('add',operands);
  }

  @Path('/sub')
  @GET
  async subToUnknownUser(@QueryParam('operands')operands : string): Promise<string> {
    this.logger.info('Saying hello to someone');
    return this.service.calc('sub',operands);
  }

  @Path('/mult')
  @GET
  async multToUnknownUser(@QueryParam('operands')operands : string): Promise<string> {
    this.logger.info('Saying hello to someone');
    return this.service.calc('mult',operands);
  }

  @Path('/div')
  @GET
  async divToUnknownUser(@QueryParam('operands')operands : string): Promise<string> {
    this.logger.info('Saying hello to someone');
    return this.service.calc('div',operands);
  }

}


