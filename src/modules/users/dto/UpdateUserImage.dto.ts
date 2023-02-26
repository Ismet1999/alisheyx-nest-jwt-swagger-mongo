import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class UpdateUserImageDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
