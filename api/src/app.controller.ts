// src/app.controller.ts (in the gateway project)
import { Controller, Get, Post, Body, Param, Patch, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Controller('tasks')
export class AppController {
  private tasksServiceBaseUrl = 'http://localhost:3000/tasks';

  @Get()
  async getTasks(@Res() res) {
    try {
      const response = await axios.get(this.tasksServiceBaseUrl);
      return res.status(HttpStatus.OK).send(response.data);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
    }
  }

  @Get(':id')
  async getTask(@Param('id') id: string, @Res() res) {
    try {
      const response = await axios.get(`${this.tasksServiceBaseUrl}/${id}`);
      return res.status(HttpStatus.OK).send(response.data);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
    }
  }

  @Post()
  async createTask(@Body() body: any, @Res() res) {
    try {
      const response = await axios.post(this.tasksServiceBaseUrl, body);
      return res.status(HttpStatus.CREATED).send(response.data);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
    }
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() body: any, @Res() res) {
    try {
      const response = await axios.patch(`${this.tasksServiceBaseUrl}/${id}`, body);
      return res.status(HttpStatus.OK).send(response.data);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Res() res) {
    try {
      const response = await axios.delete(`${this.tasksServiceBaseUrl}/${id}`);
      return res.status(HttpStatus.OK).send(response.data);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
    }
  }
}