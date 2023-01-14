import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsNotEmpty()
  @IsOptional()
  search?: string;
}
