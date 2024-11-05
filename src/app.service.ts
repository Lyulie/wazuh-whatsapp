import { Injectable } from '@nestjs/common';
import { ClientService } from './connection/client.service';

@Injectable()
export class AppService {
  constructor(private readonly clientService: ClientService) {}

  async sendMessage(message: string): Promise<boolean> {
    return await this.clientService.sendMessage(message)
  }
}
