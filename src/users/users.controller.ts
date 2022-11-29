import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import CreateUserDto from './dto/createUser.dto';
import FindOneParams from '../utils/findOneParams';

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { };

    @Get('all')
    @ApiOperation({ summary: "Get all Users" })
    @ApiResponse({
        status: 200,
        description: "The found record",
    })
    async getAll() {
        // console.log("Getting all users");
        return await this.usersService.getAllUsers();
        // return await this.mailService.sendMail(email, name);
    }

    @Post("create")
    @ApiOperation({ summary: "Create user" })
    async register(@Body() registrationData: CreateUserDto) {
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
            });
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    "User with that wallet_address already exists",
                    HttpStatus.BAD_REQUEST
                );
            }
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Patch(":address")
    async updatePost(
      @Param() { address }: FindOneParams,
      @Body() updateData: CreateUserDto
    ) {
      return this.usersService.update(address, updateData);
    }
}
