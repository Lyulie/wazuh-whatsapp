import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { WazuhAlert } from './dto/wazuh-alert';

interface WazuhResponse {
  status: string,
  message?: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleAlert(@Body() dto: WazuhAlert): Promise<WazuhResponse> {
    const wazuhAlert = Object.assign(new WazuhAlert(), dto)
    console.log('Received alert:', wazuhAlert.stringify())

    return this.appService.sendMessage(wazuhAlert.stringify())
      .then(result => {
        if (result) {
          return { status: 'success', message: 'Message sent successfully' }
        } else {
          return { status: 'error', message: 'Failed to send message' }
        }
      })
      .catch(err => {
        return { status: 'error', message: `Error sending message: ${err.message}` }
      })
  }
}