import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  limit: number;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
