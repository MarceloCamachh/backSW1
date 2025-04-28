// src/design/design.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, NotFoundException } from '@nestjs/common';
import { DesignService } from './design.service';
import { Design } from '../../generated/prisma';

@Controller('designs')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post()
  create(@Body() body: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.designService.create(body);
  }

  @Get()
  findByUser(@Query('email') email: string) {
    return this.designService.findByUserEmail(email);
  }

  @Get(':id')
async findOne(@Param('id') id: string) {
  const design = await this.designService.findOne(id);
  if (!design) {
    throw new NotFoundException("Diseño no encontrado");
  }
  return design;
}

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Design>) {
    return this.designService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.designService.delete(id);
  }
}
