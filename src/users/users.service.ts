import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(name: string, email: string, password: string) {
    const newUser = new this.userModel({name, email, password})
    const result = await newUser.save();
    return result._id;
  }

  getUsers() {
    return [...this.users];
  }

  getSingleUser(userId: string) {
    const user = this.findUser(userId);
    return { ...user };
  }

  private findUser(id: string): User {
    const user = this.users.find(a => a.id == id);
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}