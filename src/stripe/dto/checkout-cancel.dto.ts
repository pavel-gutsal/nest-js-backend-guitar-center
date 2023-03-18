import { IsNotEmpty, IsString } from 'class-validator';

export class CheckoutCancelDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
