# WhatsApp Wazuh

This project integrates with the WhatsApp Web API using `whatsapp-web.js` and NestJS to send messages based on specific events at Wazuh.

## Features

- **Message Sending**: Automatically send messages to a WhatsApp group.
- **QR Code Authentication**: Authenticate on WhatsApp Web by scanning a QR code.
- **Session Persistence**: Maintain the session to avoid re-authentication.

## Known Issues

### Vulnerabilities
There are known vulnerabilities in the `whatsapp-web.js` library:
- **High Severity Vulnerabilities**: The library has been reported to have high severity vulnerabilities related to exposure of sensitive information: [how to fix this? (4 high severity vulnerabilities) #1167 - GitHub](https://github.com/pedroslopez/whatsapp-web.js/issues/1167). It is recommended to regularly update the library and apply fixes provided by the maintainers.
