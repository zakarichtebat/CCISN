import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: {
    nom?: string;
    prenom?: string;
    email?: string;
    motDePasse?: string;
    numRegistreCommerce?: string;
    secteurActivite?: string;
    telephone?: string;
    adresse?: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}