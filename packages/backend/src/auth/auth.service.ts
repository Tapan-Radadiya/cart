import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string, name: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.prisma.user.create({
      data: { email, name, hashedPassword },
    });
    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' }
    );
    return { access_token: token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' }
    );
    return { access_token: token };
  }
}