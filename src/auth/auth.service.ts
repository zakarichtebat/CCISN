import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.motDePasse, 10);

    // Create user with hashed password
    const user = await this.userService.create({
      ...userData,
      motDePasse: hashedPassword,
    });

    // Remove password from response
    const { motDePasse, ...result } = user;
    return result;
  }

  async login(email: string, motDePasse: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        numRegistreCommerce: user.numRegistreCommerce,
        secteurActivite: user.secteurActivite,
        telephone: user.telephone,
        adresse: user.adresse,
      },
    };
  }
} 