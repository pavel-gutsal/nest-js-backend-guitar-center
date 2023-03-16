import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ModifyOption } from '../types';

export class UpdateCartDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'model should not be empty' })
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'option should not be empty' })
  @IsString()
  @IsEnum(ModifyOption)
  option: ModifyOption;
}
