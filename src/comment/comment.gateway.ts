import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class CommentGateway {
  @WebSocketServer() server;

  @SubscribeMessage('comment')
  handleEvent(@MessageBody() comment: string): string {
    console.log('works' + comment);
    return comment + 'boo';
  }
}
