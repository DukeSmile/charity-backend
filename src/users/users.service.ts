import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import CreateUserDto from "./dto/createUser.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    //console.log(newUser);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
