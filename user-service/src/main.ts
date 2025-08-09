import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GRPC_PORT = process.env.GRPC_PORT || 50051;
  const GRPC_HOST = process.env.GRPC_HOST || '0.0.0.0';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), 'src/config/grpc/proto/user.proto'),
      url: `${GRPC_HOST}:${GRPC_PORT}`,
    },
  });
  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('Handles user registration, login, and preferences')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); 
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3001);
  console.log(`User Service is running on: ${await app.getUrl()}`);
  console.log(`Swagger is available at: ${await app.getUrl()}/api/docs`);
  console.log(`gRPC service is running on: ${GRPC_HOST}:${GRPC_PORT}`);
}
bootstrap();
