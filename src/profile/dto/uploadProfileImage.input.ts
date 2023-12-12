import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProfileImageDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  user_id: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  profile_image_url: string;

  constructor(body: any) {
    this.user_id = body.user_id;
    this.profile_image_url = body.profile_image_url;
  }
}
