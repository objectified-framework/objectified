import {ClassService, ServiceResponse} from "../generated/services";
import {ClassDto} from "../generated/dto";

export class ClassServiceImpl implements ClassService {
  createClass(request, classDto: ClassDto): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  disableClassById(request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  editClassById(request, id: string, classDto: ClassDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  getClassById(request, id: string): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  listClasses(request): Promise<ServiceResponse<ClassDto[]>> {
    return Promise.resolve(undefined);
  }

}