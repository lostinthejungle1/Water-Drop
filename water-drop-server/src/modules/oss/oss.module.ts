import { Module } from '@nestjs/common';
import { OssResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [],
  providers: [OssResolver, OSSService],
  exports: [],
})
export class OSSModule {}
