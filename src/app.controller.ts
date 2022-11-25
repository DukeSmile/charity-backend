import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import LoginDto from './users/dto/login.dto';

@ApiBearerAuth()
@ApiTags("Login")
@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return "Hello World";
  }
  
  @ApiOperation({
    summary: 'Login with metamask sign hash.',
    description:
      'Returns access token when the login is successful. Otherwise BadRequestException will occur.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @Post('login')
  async login(@Body() logindata: LoginDto)
  {
    const user = await this.authService.login(logindata);
    //console.log(user);
    // response.cookie('accessToken', user.token, {
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // });
    //console.log("ok");
    return user;
  }
}
