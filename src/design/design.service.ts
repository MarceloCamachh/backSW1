// src/design/design.service.ts
import { Injectable } from '@nestjs/common';
import { Design } from '../../generated/prisma';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DesignService {
  constructor(private prisma: PrismaService) {}

  create(data: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.design.create({ data: {
        ...data,
        data: data.data ?? {}, // ← evita error por null
      },
     });
  }

  findByUserEmail(email: string) {
    return this.prisma.design.findMany({ where: { userEmail: email } });
  }

  findOne(id: string) {
    return this.prisma.design.findUnique({ where: { id } });
  }

  update(id: string, data: Partial<Design>) {
    return this.prisma.design.update({ where: { id }, data: {
        ...data,
        data: data.data ?? {}, // ← igual aquí
      },
     });
  }

  delete(id: string) {
    return this.prisma.design.delete({ where: { id } });
  }
}
