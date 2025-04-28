import {
    WebSocketGateway,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // o tu FRONTEND_URL si usás `.env`
      credentials: true,
    },
  })
   export class CanvasGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    private logger = new Logger('CanvasGateway');
    @WebSocketServer()
     server: Server;
    afterInit(server: Server) {
      this.logger.log('WebSocket server initialized');
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('join')
    handleJoinRoom(
      @MessageBody() roomId: string,
      @ConnectedSocket() client: Socket,
    ) {
      client.join(roomId);
      this.logger.log(`Client ${client.id} joined room ${roomId}`);
    }
  
    @SubscribeMessage('element:update')
    handleElementUpdate(
    @MessageBody() data: { roomId: string; frame: any },
    @ConnectedSocket() client: Socket,
    ) {
    console.log("Update recibido:", data);
    client.broadcast.to(data.roomId).emit('element:update', {
        roomId: data.roomId,
        frame: data.frame,
    });
    client.emit('element:update', {
        roomId: data.roomId,
        frame: data.frame,
    });
    }
  
    @SubscribeMessage('element:add')
handleElementAdd(
  @MessageBody() data: { roomId: string; frame: any },
  @ConnectedSocket() client: Socket,
) {
  console.log("Add recibido:", data);
  client.to(data.roomId).emit('element:add', {
    roomId: data.roomId,
    frame: data.frame,
  });
}

@SubscribeMessage('element:delete')
handleElementDelete(
  @MessageBody() data: { roomId: string; elementId: string },
  @ConnectedSocket() client: Socket,
) {
  console.log("Delete recibido:", data);
  client.to(data.roomId).emit('element:delete', {
    roomId: data.roomId,
    elementId: data.elementId,
  });
}
  }
  