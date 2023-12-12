import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserGenderEnum } from "../enums/user.gender.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  first_name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  last_name: string;

  @MinLength(10)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  @IsNotEmpty()
  //   @Length(10, 10, {
  //     message: "Phone number must be exactly 10 characters long",
  //   })
  phone: number;

  @IsEnum(UserGenderEnum)
  @IsNotEmpty()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  address: string;

  constructor(body: any) {
    this.first_name = body.first_name;
    this.last_name = body.last_name;
    this.email = body.email;
    this.phone = body.phone;
    this.gender = body.gender;
    this.address = body.address;
  }
}
