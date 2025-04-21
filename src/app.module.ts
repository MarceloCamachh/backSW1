import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CanvasModule } from './canvas/canvas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
    CanvasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
