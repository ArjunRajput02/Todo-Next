import { ApiProperty } from '@nestjs/swagger';

export class DeleteTodoResponseDto {
  @ApiProperty()
  id: number;
}
