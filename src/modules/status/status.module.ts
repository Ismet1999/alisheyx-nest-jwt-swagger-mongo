import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusController } from './status.controller';
import { Status, StatusSchema } from './status.schema';
import { StatusService } from './status.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  providers: [StatusService],
  controllers: [StatusController],
  exports: [],
})
export class StatusModule {}
