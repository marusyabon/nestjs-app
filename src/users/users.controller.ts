import {
    Controller,
    Get,
    Post,
    Param,
    Body
  } from '@nestjs/common';
  
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    getAllUsers() {
      return this.usersService.getUsers();
    }
  
    @Get(':id')
    getUser(@Param('id') prodId: string) {
      return this.usersService.getSingleUser(prodId);
    }

    @Post()
    async addUser(
      @Body('name') userName: string,
      @Body('email') userEmail: string,
      @Body('password') userPass: string
    ) {
      const generatedId = await this.usersService.insertUser(
        userName,
        userEmail,
        userPass
      )
      return { id: generatedId };
    }
  }