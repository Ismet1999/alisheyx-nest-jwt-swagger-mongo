import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceController } from './invoice.controller';
import { Invoice, InvoiceSchema } from './invoice.schema';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
  exports: [],
})
export class InvoiceModule {}
