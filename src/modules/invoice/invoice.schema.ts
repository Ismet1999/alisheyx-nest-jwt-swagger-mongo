import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from '../status/status.schema';
import { Users } from '../users/users.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @ApiProperty({
    example: { key: 'value', key1: 'value' },
    description: 'Invoice data',
  })
  @Prop({ type: Object })
  data: object;

  @ApiProperty({
    example: '63f7d9078f6d39f09bdb90fa',
    description: 'Status _id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status: Status;

  @ApiProperty({
    example: '63f7d9078f6d39f09bdb90fa',
    description: 'User _id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: Users;

  // created_at: Date;
  @Prop({ default: Date.now })
  created_at: Date;

  // updated_at: Date;
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
