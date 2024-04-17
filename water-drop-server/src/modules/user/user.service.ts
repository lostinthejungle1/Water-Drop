import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  //create a user
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res && res.raw.affectedRows) {
      return true;
    }
    return false;
  }

  //delete a user
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  //edit a user
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    // if (res && res.affected > 0) {
    //   return true;
    // }
    return res;
  }

  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreatedAt: new Date(),
    });
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }
}
