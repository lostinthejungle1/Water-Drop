import { Injectable } from '@nestjs/common';
import { getRandomCode } from '../../shared/utils';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //create a user
  async sendCodeMsg(tel: string): Promise<boolean> {
    console.log(tel);
    // later on finish this part using ali cloud
    const code = getRandomCode();
    // 查询tel相关用户，如果查询到，更新code，如果未查询到，新建用户
    const user = await this.userService.findByTel(tel);
    if (user) {
      //to see whether its been sent within a minitue, if yes, return false
      const diffTime = dayjs().diff(dayjs(user.codeCreatedAt));
      if (diffTime < 60 * 1000) {
        return false;
      }
      const result = await this.userService.updateCode(user.id, code);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
    const result = await this.userService.create({
      tel,
      code,
      codeCreatedAt: new Date(),
    });
    return result;
  }
}
