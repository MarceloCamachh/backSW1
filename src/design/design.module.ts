import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';

@Module({
  providers: [DesignService],
  controllers: [DesignController]
})
export class DesignModule {}
