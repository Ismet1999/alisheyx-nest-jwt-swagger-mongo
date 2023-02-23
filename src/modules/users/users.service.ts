import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { HashService } from './hash.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private hashService: HashService,
  ) {}
  getAllUsers(query: any) {
    return this.usersModel.find(query);
  }
  async createUser(user: CreateUserDto) {
    const newUser = new this.usersModel();
    newUser.username = user.username;
    newUser.password = await this.hashService.hashPassword(user.password);
    newUser.phone_number = user.phone_number;
    newUser.email = user.email;
    return newUser.save();
  }
  getUserById(id: string) {
    return this.usersModel.findById(id);
  }

  updateUserById(id: string, body: CreateUserDto) {
    return this.usersModel.findByIdAndUpdate(id, body, { new: true });
  }

  deleteUserById(id: string) {
    return this.usersModel.findByIdAndDelete(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }
  async getUserByUsername(username: string) {
    return await this.usersModel.findOne({ username });
  }
}
