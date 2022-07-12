import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CareerListDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  stack: string;
}
