import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class LikedItemListDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  list: string[];
}
