import {HelloWorldApi} from './calc.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import { BadRequestError } from 'typescript-rest/dist/server/model/errors';
import axios from 'axios';

export class HelloWorldService implements HelloWorldApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('HelloWorldService');
  }

  baseURL = "https://sample-tdd-dev-rahul.eco-training-f2c6cdc6801be85fd188b09d006f13e3-0000.us-east.containers.appdomain.cloud"

  async toRoman(value: number): Promise<string> {
    return await axios.get(`${this.baseURL}/number-to-roman`, { params: { value: value } }).then(response => {
        return response.data;
    }).catch(error => {
        const err = {...error};
        if (err.statusCode === 400) throw new BadRequestError("Invalid number");
        throw new BadRequestError("Invalid number");
    });
}
async toNumber(value: string): Promise<number> {
    return await axios.get(`${this.baseURL}/roman-to-number`, { params: { value: value } }).then(response => {
        return response.data;
    }).catch(error => {
        const err = {...error};
        if (err.statusCode === 400) throw new BadRequestError("Invalid Roman Numeral");
        throw new BadRequestError("Invalid Roman Numeral");
    });
}

async calc(operation: string = "add", operands: string = "I,II"): Promise<string> {
  this.logger.info(`calculate function invoked with operation: ${operation} and operands: ${operands}`);

  if (operands.trim() === "") throw new BadRequestError("No input provided");

  // Check the length of the operands
  let Operands = operands.split(",");

  // If there is only one operand then return the operand as it is
  if (Operands.length === 1) return Operands[0].trim().toString();

  // Convert operands list from Roman to Numbers
  const numbers: number[] = await Promise.all(Operands.map(async operand => await this.toNumber(operand.trim())));;

  // Pass the Numbers list to Add/Sub/Mult/Div function  
  let resultNumber: number = this.whichOperation(operation, numbers);

  // Convert result number to Roman
  return await this.toRoman(resultNumber);
}

private whichOperation(operation: string, numbers: number[]): number {
  let resultNumber: number;
  switch (operation) {
    case "add":
      resultNumber = this.add(numbers);
      break;
    case "sub":
      resultNumber = this.sub(numbers);

    default:
      break;
  }
  return resultNumber;
}
private sub(numbers: number[]): number {
  numbers = numbers.sort((a, b) => b - a);
  let result: number = numbers[0];
  for (let i = 1; i < numbers.length; i++) result -= numbers[i];
  return result;
}

private add(operands: number[]): number {
  let result: number = 0;
  operands.forEach(operand => result += operand);
  return result;
}
}
