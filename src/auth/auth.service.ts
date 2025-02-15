import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from '../users/users.service';
import * as Web3 from 'web3';
import { ETH_RPC_URL, WEB3_SIGN_MESSAGE } from '../constants/base';
import dotenv from "dotenv";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private readonly jwtService: JwtService) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(user: any) {
    try {
      const address = user.wallet_address;
      // console.log(address);
      const ownuser = await this.usersService.getByWalletAddress(address.toLowerCase());
      const payload = {
        wallet_address: ownuser.wallet_address
      };
      return ownuser;
      // return {
      //   access: true ,
      //   wallet_address: ownuser.wallet_address,
      //   charity_type: ownuser.charity_type,
      //   goal: ownuser.goal,
      //   fund_type: ownuser.fund_type,
      //   name: ownuser.name,
      //   title: ownuser.title,
      //   photo: ownuser.photo,
      //   country: ownuser.country,
      //   location: ownuser.location,
      //   email: ownuser.email,
      //   summary: ownuser.summary,
      //   detail: ownuser.detail,
      //   vip: ownuser.vip,
      //   website: ownuser.website,
      //   phone: ownuser.phone,
      //   linkedin: ownuser.linkedin,
      //   twitter: ownuser.twitter,
      //   facebook: ownuser.facebook,
      //   instagram: ownuser.instagram,
      //   createDateTime: Date,
      //   token: this.jwtService.sign(payload),
      // };
    } catch (error) { 
      return {
        message: error, access: false 
      };
    }
  }

}