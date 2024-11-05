import { Injectable, OnModuleInit } from '@nestjs/common'
import * as qrcode from 'qrcode'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ClientService implements OnModuleInit {
    private client: Client
    private isConnected: boolean

    constructor(private configService: ConfigService) {
        this.isConnected = false
        this.configure()
    }

    onModuleInit() {
        this.authenticate()
        this.run()
    }

    getChatId(): string {
        return this.configService.get<string>('CHAT_GROUP_ID')
    }

    private checkConnection() {
        this.client.getState().then(state => {
            this.isConnected = state === 'CONNECTED'
        })
    }

    configure() {
        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: "whatsapp-client",
                dataPath: './whatsapp-sessions'
            }),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        })
    }

    authenticate() {
        this.client.on('qr', async (qr) => {
            console.log('QR code received, scan the QR code from the file:')
            try {
                await qrcode.toFile('qr-code.png', qr)
                console.log('QR code saved as qr-code.png')
            } catch (error) {
                console.error('Error saving QR code:', error)
            }
        })

        this.client.on('authenticated', () => {
            console.log('Authenticated successfully')
            this.isConnected = true
        })

        this.client.on('auth_failure', () => {
            console.error('Authentication failed, please try again.')
            this.isConnected = false
        })
    }

    run() {
        this.client.on('ready', () => {
            console.log('Client is ready!')
        })
        this.client.initialize()
    }

    async sendMessage(message: string): Promise<boolean> {
        await this.checkConnection()

        if (!this.isConnected) {
            console.log('Client is not connected. Re-authenticating...')
            this.authenticate()
        }

        try {
            await this.client.sendMessage(this.getChatId(), message)
            console.log('Message sent successfully')
            return true
        } catch (err) {
            console.error('Error sending message:', err)
            return false
        }
    }
}
