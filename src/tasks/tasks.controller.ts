import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
  //   // if we have any filters defined, call tasksService.getTasksWilFilters
  //   // otherwise, just get all tasks
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
  // ) {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
