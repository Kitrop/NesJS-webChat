import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AppService } from "../app.service";
import { Prisma } from "@prisma/client";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private appService: AppService) {}

  private readonly logger = new Logger(AppGateway.name)

  @WebSocketServer() server: Server

  afterInit(server: any): any {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]): any {
    const { sockets } = this.server.sockets
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.log(`Number of connected clients: ${sockets.size}`)
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client id: ${client.id} connected`);
  }


  @SubscribeMessage('send')
  async handleSendMessage(client: Socket, payload: Prisma.ChatMessageCreateInput): Promise<void> {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);

    await this.appService.createMessage(payload)
    this.server.emit('record', payload)
  }
}
