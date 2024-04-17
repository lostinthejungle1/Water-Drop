import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<boolean> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => String, { description: '手机验证码登陆' })
  async loginByCode(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    const user = await this.userService.findByTel(tel);
    if (
      user &&
      user.code === code &&
      dayjs().diff(dayjs(user.codeCreatedAt)) < 60 * 1000
    ) {
      return true;
    } else {
      return false;
    }
  }
}
