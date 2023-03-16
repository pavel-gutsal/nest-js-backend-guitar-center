import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Task } from './schemas/task.schema';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, GetTasksFilterDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks, endpoint used for learning and practice')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: string,
  ): Promise<Task[]> {
    return this.taskService.find(filterDto, user);
  }

  @Get(':taskId')
  async getTask(
    @Param('taskId') taskId: string,
    @GetUser() user: string,
  ): Promise<Task> {
    return this.taskService.findById(taskId, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: string,
  ): Promise<Task> {
    return this.taskService.create(createTaskDto, user);
  }

  @Delete(':taskId')
  async deleteTask(
    @Param('taskId') taskId: string,
    @GetUser() user: string,
  ): Promise<Task> {
    return this.taskService.delete(taskId, user);
  }

  @Put(':taskId')
  async updateById(
    @Param('taskId') taskid: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: string,
  ): Promise<Task> {
    return this.taskService.update(taskid, updateTaskDto, user);
  }
}
