import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    // TODO: Validate user, return JWT
  }

  async register(email: string, password: string, name: string) {
    // TODO: Create user, hash password
  }
}