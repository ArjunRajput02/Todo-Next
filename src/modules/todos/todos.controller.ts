import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoEntity } from '@/entities';
import { CreateTodoRequestDto, DeleteTodoResponseDto, UpdateTodoRequestDto } from './dto';
import { TodosService } from './todos.service';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new todo',
    description: 'Creates a new todo item.',
  })
  @ApiResponse({
    status: 201,
    description: 'Todo created successfully.',
    type: TodoEntity,
  })
  createTodo(@Body() createTodoRequestDto: CreateTodoRequestDto) {
    return this.todosService.createTodo(createTodoRequestDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all todos',
    description: 'Returns every todo item, most recently created first.',
  })
  @ApiResponse({
    status: 200,
    description: 'Todos fetched successfully.',
    type: [TodoEntity],
  })
  getAllTodos() {
    return this.todosService.getAllTodos();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a todo by id',
    description: 'Returns a single todo item by its id.',
  })
  @ApiParam({ name: 'id', description: 'Identifier of the todo', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Todo fetched successfully.',
    type: TodoEntity,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.getTodoById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a todo',
    description: 'Updates one or more fields of an existing todo item.',
  })
  @ApiParam({ name: 'id', description: 'Identifier of the todo to update', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Todo updated successfully.',
    type: TodoEntity,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoRequestDto: UpdateTodoRequestDto,
  ) {
    return this.todosService.updateTodo(id, updateTodoRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a todo',
    description: 'Deletes the specified todo item.',
  })
  @ApiParam({ name: 'id', description: 'Identifier of the todo to delete', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Todo deleted successfully.',
    type: DeleteTodoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteTodo(id);
  }
}
