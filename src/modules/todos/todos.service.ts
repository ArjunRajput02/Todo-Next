import { TodoEntity } from '@/entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoRequestDto, DeleteTodoResponseDto, UpdateTodoRequestDto } from './dto';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  // Create a new todo
  async createTodo(createTodoRequestDto: CreateTodoRequestDto): Promise<TodoEntity> {
    const todo = this.todoRepository.create({
      title: createTodoRequestDto.title,
      description: createTodoRequestDto.description ?? null,
      isCompleted: createTodoRequestDto.isCompleted ?? false,
    });

    return await this.todoRepository.save(todo);
  }

  // Get all todos
  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Get a single todo by id
  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      this.logger.error(`Todo with id ${id} not found`);
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  // Update an existing todo
  async updateTodo(id: number, updateTodoRequestDto: UpdateTodoRequestDto): Promise<TodoEntity> {
    const todo = await this.getTodoById(id);

    Object.assign(todo, updateTodoRequestDto);

    return await this.todoRepository.save(todo);
  }

  // Delete a todo
  async deleteTodo(id: number): Promise<DeleteTodoResponseDto> {
    const todo = await this.getTodoById(id);

    await this.todoRepository.delete({ id: todo.id });

    return { id };
  }
}
