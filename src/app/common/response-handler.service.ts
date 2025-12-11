import { Injectable } from '@nestjs/common';
import { GenericResponseDto } from '../../dto/generic-response.dto';
import { Meta } from '../../dto/meta.dto';

@Injectable()
export class ResponseHandlerService {
  constructor() {}

  public async handleResponse(
    data: any,
    message?: string,
  ): Promise<GenericResponseDto<any>> {
    const result: GenericResponseDto<any> = {
      message: message || 'Success',
      data: data,
      meta: new Meta({}),
    };

    return result;
  }
}
