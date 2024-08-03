import {Injectable, Logger} from '@nestjs/common';
import {GeneratorService} from "../generated/services";

@Injectable()
export class GeneratorServiceImpl implements GeneratorService {
  private readonly logger = new Logger('GeneratorServiceImpl');

}
