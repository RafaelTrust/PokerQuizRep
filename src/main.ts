import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação da API do PokerQuiz')
    .setDescription(
      'Essa documentação visa facilitar o uso da api dentro do app PokerQuiz e facilitar o entendimento dos avaliadores em como funciona a estrutura de todo o projeto de TCC 2024.1',
    )
    .setVersion('1.8')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
