import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, StatusDocument } from './status.schema';
import { CreateStatusDto } from './dto/CreateStatus.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  getAllStatus(query: any) {
    return this.statusModel.find(query);
  }
  getStatusById(id: string) {
    return this.statusModel.findById(id);
  }

  createStatus(user: CreateStatusDto) {
    return this.statusModel.create(user);
  }

  updateStatusById(id: string, body: CreateStatusDto) {
    return this.statusModel.findByIdAndUpdate(id, body, { new: true });
  }

  deleteStatusById(id: string) {
    return this.statusModel.findByIdAndDelete(id);
  }
}
