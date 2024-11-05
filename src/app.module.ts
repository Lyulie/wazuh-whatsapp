import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './connection/client.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, ClientService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly clientService: ClientService) {}

  onModuleInit() { }
}
