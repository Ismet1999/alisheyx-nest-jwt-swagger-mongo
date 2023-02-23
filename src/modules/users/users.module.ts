import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './hash.service';
import { UsersController } from './users.controller';
// import { Users } from './users.entity';
import { Users, UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Users])],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UsersService, HashService],
  controllers: [UsersController],
  exports: [UsersService, HashService],
})
export class UsersModule {}
