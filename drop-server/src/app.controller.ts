import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '水滴超级管理员',
      desc: '管理员',
      tel: '8800888',
      password: '123456',
      account: 'admin',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('d5a8c5e8-5390-49a8-ba43-3a286a013db4');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '1a8db86a-d2f5-4167-a1da-5693fec85da3',
      { name: 'liangliang' },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('1a8db86a-d2f5-4167-a1da-5693fec85da3');
  }
}
