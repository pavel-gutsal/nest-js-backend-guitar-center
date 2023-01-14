import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is 3 characters',
  })
  @MaxLength(50, {
    message: 'Title is too long. Maximal length is 50 characters',
  })
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Description is too short. Minimum length is 6 characters',
  })
  @MaxLength(500, {
    message: 'Description is too long. Maximal length is 500 characters',
  })
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
