import { HttpStatus, ValidationPipe } from '@nestjs/common';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const SETTINGS = {
  VALIDATION_PIPE,

  PAGINATION: {
    DEFAULT_LIMIT: 10,
    DEFAULT_PAGE: 1,
  },
};
