import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is 3 characters',
  })
  @MaxLength(50, {
    message: 'Title is too long. Maximal length is 50 characters',
  })
  title: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Description is too short. Minimum length is 6 characters',
  })
  @MaxLength(500, {
    message: 'Description is too long. Maximal length is 500 characters',
  })
  description: string;
}
