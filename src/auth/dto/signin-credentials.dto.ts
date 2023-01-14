import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninCredentialsDto {
  @IsString()
  @IsNotEmpty({
    message: 'email cannot be empty',
  })
  @IsEmail(undefined, { message: 'email is not valid' })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'email cannot be empty',
  })
  password: string;
}
