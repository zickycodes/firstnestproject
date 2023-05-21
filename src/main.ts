import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sequelize = app.get('SequelizeToken');
  const redisClient = app.get('RedisToken');
  if (redisClient.connected) {
    console.log('Connected to Redis!');
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');

      await app.listen(process.env.PORT || 3000);
      -console.log('Application started');
      await sequelize.sync();
    } catch (err) {
      console.log('Failed to connect to the database:', err);
      return;
    }
  } else {
    console.log('Redis not connected');
  }
}

bootstrap();
