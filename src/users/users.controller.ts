import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import CreateUserDto from './dto/createUser.dto';

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { };

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
                    "User with that email already exists",
                    HttpStatus.BAD_REQUEST
                );
            }
            throw new HttpException(
                "Something went wrong",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
