import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';
import { SETTINGS } from 'src/app.utils';
import { FindInvoiceDto } from './dto/FindInvoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async getAllInvoiceAllUser(query: FindInvoiceDto) {
    const { page, limit, ...rest } = query;
    const _page = parseInt(query.page) || SETTINGS.PAGINATION.DEFAULT_PAGE;
    const _limit = parseInt(query.limit) || SETTINGS.PAGINATION.DEFAULT_LIMIT;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;
    const options = {
      skip,
      limit: _limit || SETTINGS.PAGINATION.DEFAULT_LIMIT,
      sort: { created_at: -1 },
    };
    const count = await this.invoiceModel.countDocuments(rest, options);
    const data = await this.invoiceModel
      .find(rest, null, options)
      .populate('status user', '-password -created_at -updated_at -__v');
    return {
      data,
      count,
      page: _page,
    };
  }
  async getAllInvoice(query: FindInvoiceDto) {
    const { page, limit, ...rest } = query;
    const _page = parseInt(query.page) || SETTINGS.PAGINATION.DEFAULT_PAGE;
    const _limit = parseInt(query.limit) || SETTINGS.PAGINATION.DEFAULT_LIMIT;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;
    const options = {
      skip,
      limit: _limit || SETTINGS.PAGINATION.DEFAULT_LIMIT,
      sort: { createdAt: -1 },
    };
    const count = await this.invoiceModel.countDocuments(rest);
    const data = await this.invoiceModel
      .find(rest, '-user', options)
      .populate('status', '-created_at -updated_at -__v');
    return {
      data,
      count,
      page: _page,
    };
  }
  getInvoiceById(id: string) {
    return this.invoiceModel.findById(id).populate('status');
  }

  createInvoice(user: CreateInvoiceDto) {
    return this.invoiceModel.create(user);
  }

  updateInvoiceById(id: string, body: CreateInvoiceDto) {
    return this.invoiceModel
      .findByIdAndUpdate(id, body, { new: true })
      .populate('status');
  }

  deleteInvoiceById(id: string) {
    return this.invoiceModel.findByIdAndDelete(id);
  }
}
