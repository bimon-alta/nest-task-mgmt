import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// import * as uuid from 'uuid/v1';
import {v4 as uuid} from "uuid"
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
// import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks : Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto : GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status){
      tasks = tasks.filter(task => task.status == status);
    }

    if (search){
      tasks = tasks.filter(task => 
        task.title.includes(search) ||
        task.description.includes(search),  
      );
    }
    
    return tasks;
  }

  getTaskById(id: string): Task{
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto : CreateTaskDto): Task {
    const { title, description} = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,            //ES6 jika nama key dan nama variable yg akan jd value adlh sama 
      description,      //maka cukup dgn syntax nama key saja, ini sama dgn syntax `title: title` (kiri sbg key, kanan adlh params)
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // // DELETE CHALLENGE, MY SOLUTION
  // // Memiliki kelemahan, jika tidak ditambahkan baris conditional if 
  // // maka jika id tidak ditemukan, 
  // // masih terjadi penghapusan data terakhir
  // deleteTaskById(id: string): Number{
  //   const taskIndex =  this.tasks.findIndex(task => task.id === id);
    
  //   //tanpa baris ini maka jika id tidak ditemukan, data index terakhir dihapus
  //   if (taskIndex > 0){
  //     this.tasks.splice(taskIndex, 1);
  //   }
  //   return taskIndex;
  // }

  // AUTHOR SOLUTION, lebih praktis (hemat kode)
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  
  updateTaskStatus(id: string, status: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
