import { IsNotEmpty, IsString } from 'class-validator';

export class careerDetailDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  contract: string;

  @IsString()
  group: string;

  @IsString()
  content: string;

  @IsString()
  stack: string;
}
