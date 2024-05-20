import { Injectable } from '@nestjs/common';
export * from './Err/delete-general';
export * from './Err/erro-interno';
export * from './Err/erro-unauthorized';

@Injectable()
export class BibliotecaService {
  generateRandomConfirmationCode(length: number) {
    const characters =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }

  generateRandomConfirmationCodeNumber(length: number) {
    const characters = '0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }
}
