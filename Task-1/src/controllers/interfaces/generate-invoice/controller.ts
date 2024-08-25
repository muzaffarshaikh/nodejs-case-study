import IResult from './result';

export default interface IController {
  process(): Promise<IResult>;
}
