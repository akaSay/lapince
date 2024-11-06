import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsObject()
  @IsOptional()
  notifications?: {
    email: boolean;
    push: boolean;
    budget: boolean;
    weekly: boolean;
    monthly: boolean;
  };

  @IsObject()
  @IsOptional()
  privacy?: {
    showProfile: boolean;
    showStats: boolean;
    showBudget: boolean;
  };

  @IsObject()
  @IsOptional()
  export?: {
    format: string;
    frequency: string;
  };
}
