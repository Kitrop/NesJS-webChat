import { Body, Controller, Get, Post, Render, Res, UsePipes } from "@nestjs/common";
import { AppService } from './app.service';
import { ChatMessage } from "@prisma/client";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/chat')
  @Render('index')
  Home() {
    return
  }

  @Get('api/messages')
  messages() {
    return this.appService.messages();
  }

  @Post('api/createmessage')
  async createMessage(@Body() data: ChatMessage) {
    return await this.appService.createMessage(data)
  }

  @Get('api/chat')
  async getMessages(@Res() res) {
    const response = await this.appService.messages()
    res.json(response)
  }
}
