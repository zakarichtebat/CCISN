import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Doe' },
        prenom: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        motDePasse: { type: 'string', example: 'password123' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' }
      },
      required: ['nom', 'prenom', 'email', 'motDePasse', 'numRegistreCommerce', 'secteurActivite', 'telephone', 'adresse']
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        nom: { type: 'string', example: 'Doe' },
        prenom: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' },
        createdAt: { type: 'string', example: '2024-05-17T20:00:00.000Z' }
      }
    }
  })
  async register(@Body() userData: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com' },
        motDePasse: { type: 'string', example: 'password123' }
      },
      required: ['email', 'motDePasse']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in.',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            nom: { type: 'string', example: 'Doe' },
            prenom: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'john@example.com' },
            numRegistreCommerce: { type: 'string', example: 'RC123456' },
            secteurActivite: { type: 'string', example: 'Informatique' },
            telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
            adresse: { type: 'string', example: '123 Rue Example, Ville' }
          }
        }
      }
    }
  })
  async login(@Body() loginData: { email: string; motDePasse: string }) {
    return this.authService.login(loginData.email, loginData.motDePasse);
  }
} 