import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { stringify } from 'querystring';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query() filterDTo: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDTo).length){
      return this.tasksService.getTasksWithFilters(filterDTo);
    }else{
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    // console.log('title : ', title);
    // console.log('description : ', description);
    return this.tasksService.createTask(createTaskDto);
  }

  // // DELETE CHALLENGE, MY SOLUTION
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Number {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // AUTHOR SOLUTION
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id : string,
    @Body('status') status : TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
