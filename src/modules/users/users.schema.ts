import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  // @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ type: String, unique: true })
  @ApiProperty({
    example: 'username',
    description: 'Username',
  })
  username: string;

  @Prop({ type: String })
  @ApiProperty({ example: '123456', description: 'User password' })
  password: string;

  // first_name
  @Prop({ type: String })
  @ApiProperty({ example: 'John', description: 'User first name' })
  first_name: string;

  // last_name
  @Prop({ type: String })
  @ApiProperty({ example: 'Doe', description: 'User last name' })
  last_name: string;

  @Prop({ type: String })
  @ApiProperty({ example: '+998912345678', description: 'User phone number' })
  phone_number: string;

  @Prop({ type: String })
  @ApiProperty({ example: 'example@mail.com', description: 'User email' })
  email: string;

  @Prop({ type: String })
  @ApiProperty({ example: 'user photo', description: 'User photo' })
  photo: string;

  // created_at: Date;
  @Prop({ default: Date.now })
  created_at: Date;

  // updated_at: Date;
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
