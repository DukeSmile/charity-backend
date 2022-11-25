import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as Web3 from 'web3';
import { ETH_RPC_URL, WEB3_SIGN_MESSAGE } from '../constants/base';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(private usersService: UsersService) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(user: any) {
    console.log(user);
    const web3 = new (Web3 as any)(
      new (Web3 as any).providers.HttpProvider(ETH_RPC_URL),
    );
    try {
      const address = web3.eth.accounts.recover(WEB3_SIGN_MESSAGE, user.sign_hash);
      console.log(address);
      return;
      const ownuser = await this.usersService.getByWalletAddress(user.email);
      //console.log(ownuser);
      // if(user.password != ownuser.wallet_address)
      // {
      //   return {
      //     message: 'Access denied, There is no user.', access: false 
      //   };
      // }
      const payload = {
        address: ownuser.wallet_address,
        // id: ownuser.id,
        // email: ownuser.email,
        // role: user.role,
        // state: user.state,
      };
      return {
        wallet_address: ownuser.wallet_address,
        charity_type: ownuser.charity_type,
        goal: ownuser.goal,
        fund_type: ownuser.fund_type,
        name: ownuser.name,
        title: ownuser.title,
        photo: ownuser.photo,
        country: ownuser.country,
        location: ownuser.location,
        email: ownuser.email,
        summary: ownuser.summary,
        detail: ownuser.detail,
        vip: ownuser.vip,
        website: ownuser.website,
        phone: ownuser.phone,
        linkedin: ownuser.linkedin,
        twitter: ownuser.twitter,
        facebook: ownuser.facebook,
        instagram: ownuser.instagram,
        createDateTime: Date,
        token: this.jwtService.sign(payload),
      };
    } catch (error) { 
      return {
        message: 'Access denied, incorrect Email.', access: false 
      };
    }
  }

}