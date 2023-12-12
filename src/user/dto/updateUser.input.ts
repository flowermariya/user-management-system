import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserGenderEnum } from "../enums/user.gender.enum";

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsOptional()
  @MinLength(10)
  email: string;

  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsEnum(UserGenderEnum)
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
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
