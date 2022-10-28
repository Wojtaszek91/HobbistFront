import { MessageSseService } from './message-sse.service';
import { MessageService } from './message.service';
import { MessageFacade } from './message.facade';

export const MessageCore = [
  MessageFacade,
  MessageService,
  MessageSseService
]
