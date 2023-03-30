import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/User';
import { SignUpDto } from 'src/auth/dtos/signupdto';
// import { QueryTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(userDetails: SignUpDto) {
    const password = userDetails.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await this.userModel.create({
      ...userDetails,
      password: hashedPassword,
    });
    return res;
  }

  async findOne(userdetail: object): Promise<any> {
    // console.log(id);

    // return await this.userModel.sequelize.query(
    //   'SELECT * FROM "Users" WHERE email = ?',
    //   {
    //     replacements: [email],
    //     type: QueryTypes.SELECT,
    //   },
    // );
    return await this.userModel.findOne({
      where: {
        ...userdetail,
      },
    });
  }

  async findOneAndUpdate(id: number, userdetails: object): Promise<any> {
    // console.log(id);
    console.log(userdetails);
    return await this.userModel.update(
      {
        ...userdetails,
      },
      { where: { id } },
    );
  }
}
