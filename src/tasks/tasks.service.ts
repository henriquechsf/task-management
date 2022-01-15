import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((task) => task.id === id);
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return foundTask;
  // }
  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return foundTask;
  }

  // createTask(createTaskDto: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }
}
