import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto, GetTasksFilterDto } from './dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async find(filterDto: GetTasksFilterDto, user: string): Promise<Task[]> {
    const { search } = filterDto;

    if (!search) {
      return this.taskModel.find({ user });
    }

    // creates regex /variable/i - case insensative
    const searchRegex = new RegExp(search, 'i');

    // $or - chech either one of fields contains searchRegex
    return this.taskModel.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });
  }

  async findById(id: string, user: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }

    if (task.user !== user) {
      throw new UnauthorizedException(
        `Task with id:${id} does not belong to current user`,
      );
    }

    return task;
  }

  async create(
    { title, description }: CreateTaskDto,
    user: string,
  ): Promise<Task> {
    const task = await this.taskModel.create({
      title,
      description,
      completed: false,
      user,
    });
    return task;
  }

  async delete(id: string, user: string): Promise<Task> {
    await this.findById(id, user);

    return await this.taskModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: string,
  ): Promise<Task> {
    await this.findById(id, user);

    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
  }
}
