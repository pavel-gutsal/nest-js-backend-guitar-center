import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;

export class SignupCredentialsDto {
  @IsString()
  @IsNotEmpty({ message: 'user name should not be empty' })
  @MinLength(3, {
    message: 'user name is too short. Minimum length is 3 characters',
  })
  @MaxLength(20, {
    message: 'user name is too long. Maximal length is 20 characters',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'email cannot be empty',
  })
  @IsEmail(undefined, { message: 'email is not valid' })
  email: string;

  @IsString()
  @Matches(passwordRegex, {
    message: 'Password must contain at least 1 number, 1 uppercase later',
  })
  password: string;
}
