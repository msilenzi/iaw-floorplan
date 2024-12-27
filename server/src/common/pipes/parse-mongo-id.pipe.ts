import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId, Types } from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: unknown) {
    if (isValidObjectId(value)) {
      return new Types.ObjectId(value as string)
    }
    throw new BadRequestException('ID inválido')
  }
}
