export abstract class HelloWorldApi {
  abstract calc(operation?: string,operands?: string): Promise<string>;
}
