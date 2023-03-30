import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   // return this.userService.findAll();
  //   const user = this.userService.findOne(id);
  //   return user;
  // }
  // @Post()
  // createUser(@Body() userDetails: CreateUserDto) {
  //   console.log(userDetails);
  //   return this.userService.createUser(userDetails);
  // }
}
