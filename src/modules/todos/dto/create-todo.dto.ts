import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoRequestDto {
  @ApiProperty({ example: 'Complete Project' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title: string;

  @ApiProperty({ example: 'Complete the remaining task', required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
