import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./user.entity";
import CreateUserDto from "./dto/createUser.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAllUsers() {
    return this.usersRepository
        .createQueryBuilder()
        .select("*")
        .execute();
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    // console.log(newUser);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update(address: string, profileDto: CreateUserDto) {
    let user = await this.usersRepository.findOneBy({wallet_address: address});
    try {
      await this.usersRepository.update(user.id, profileDto);
    } catch (error) { 
      return {
        message: 'update failed.', access: false
      };
    }
    user = await this.usersRepository.findOneBy({wallet_address: address});
    return user;
  }

  async getByWalletAddress(address: string) {
    const findOptions: FindOneOptions = {
      where: {
        wallet_address : address
      }
    }
    const user = await this.usersRepository.findOneBy({wallet_address: address});
    if (user) {
      return user;
    }
    throw new HttpException(
      "User with this wallet_address does not exist",
      HttpStatus.NOT_FOUND
    );
  }
}
