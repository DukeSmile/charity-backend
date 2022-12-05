import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as Web3 from 'web3';

import { UsersService } from '../users/users.service';
import { ETH_RPC_URL, WEB3_SIGN_MESSAGE } from '../constants/base';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const roles = this.reflector.get<string>('roles', context.getHandler());
    // console.log(roles);
    if (roles === 'guest') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.headers['authorization']) {
      return false;
    }
    
    let wallet_address = ""; 
    if ( roles === "user" || roles === 'login' ) 
      wallet_address = request.body['wallet_address'];
    if(!wallet_address)
      return false;

    let decrypt_address = "";
    //decrypting sign_hash
    const sign = request.headers['authorization'].replace('Bearer ', '');
    if (!sign) {
      return false;
    }
    const web3 = new (Web3 as any)(
      new (Web3 as any).providers.HttpProvider(ETH_RPC_URL),
    );
    try {
      decrypt_address = web3.eth.accounts.recover(WEB3_SIGN_MESSAGE, sign);
      if (!decrypt_address) {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    
    // console.log(wallet_address, decrypt_address);
    if (wallet_address.toLowerCase() === decrypt_address.toLowerCase())
      return true;
    return false;
  }
}