import { CanvasGateway } from './canvas.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [CanvasGateway],
})
export class CanvasModule {}
