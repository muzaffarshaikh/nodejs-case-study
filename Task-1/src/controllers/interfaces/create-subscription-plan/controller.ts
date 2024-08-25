import IConfig from './config';
import IResult from './result';

export default interface IController {
  process(config: IConfig): IResult;
}
