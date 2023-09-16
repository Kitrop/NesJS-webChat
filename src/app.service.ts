import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatMessage, Prisma } from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async messages(): Promise<ChatMessage[]> {
    return this.prisma.chatMessage.findMany()
  }
  async createMessage(data: Prisma.ChatMessageCreateInput): Promise<ChatMessage> {
    return this.prisma.chatMessage.create({
      data,
    })
  }
}
