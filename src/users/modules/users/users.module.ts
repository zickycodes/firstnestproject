import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from 'src/users/controllers/users/users.controller';
import { UsersService } from 'src/users/service/users/users.service';
import { User } from 'src/entities/User';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
