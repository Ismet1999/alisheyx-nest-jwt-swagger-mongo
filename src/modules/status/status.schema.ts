import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema()
export class Status {
  @ApiProperty({
    example: { ru: 'Ru', uz: 'Uz' },
    description: 'Status title',
  })
  @Prop({ type: Object })
  title: object;

  // color
  @ApiProperty({
    example: '#000000',
    description: 'Status color',
  })
  @Prop({ type: String })
  color: string;

  // created_at: Date;
  @Prop({ default: Date.now })
  created_at: Date;

  // updated_at: Date;
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
