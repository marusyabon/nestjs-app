import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(name: string, email: string, password: string) {
    const newUser = new this.userModel({name, email, password})
    const result = await newUser.save();
    return result._id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserById(userId: string) {
    const user = this.findUser(userId);
    return { ...user };
  }

  private findUser(id: string): User {
    const user = this.userModel.find({_id: id});
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}