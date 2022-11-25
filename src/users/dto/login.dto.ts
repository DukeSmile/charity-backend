import { ApiProperty } from "@nestjs/swagger";

export default class LoginDto {
    @ApiProperty()
    public sign_hash: string;
}
