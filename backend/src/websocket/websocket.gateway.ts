/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
// src/websocket/websocket.gateway.ts
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { SensorDataService } from 'src/sensor/sensor-data.service';
import WebSocket from 'ws';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('WebsocketGateway');
  private wsClient: WebSocket;

  constructor(private readonly sensorDataService: SensorDataService) {
    // Connessione al server WebSocket esterno
    this.connectToExternalWS();
  }

  private connectToExternalWS() {
    this.wsClient = new WebSocket('ws://192.168.7.254/ws');

    this.wsClient.on('open', () => {
      this.logger.log('Connected to external WebSocket server');
    });

    this.wsClient.on('message', async (data: WebSocket.Data) => {
      try {
        // Parsing dei dati ricevuti
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const parsedData = JSON.parse(data.toString());
        this.logger.log(
          `Received data from sensor: ${JSON.stringify(parsedData)}`,
        );

        // Estrai i dati rilevanti
        const sensorData = {
          macAddress: '01:32:54:67:89:AB',
          humidity: parsedData.humidity,
          pressure: parsedData.pressure,
          temperature: parsedData.temperature,
          timestamp: new Date(),
        };

        // Salva nei dati storici
        await this.sensorDataService.saveHistoricalData(sensorData);

        // Aggiorna i dati in tempo reale
        await this.sensorDataService.updateRealtimeData(sensorData);
      } catch (error) {
        this.logger.error(`Error processing message: ${error.message}`);
      }
    });

    this.wsClient.on('error', (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
      // Riconnessione dopo un errore
      setTimeout(() => this.connectToExternalWS(), 5000);
    });

    this.wsClient.on('close', () => {
      this.logger.log('Connection to external WebSocket server closed');
      // Riconnessione dopo la chiusura
      setTimeout(() => this.connectToExternalWS(), 5000);
    });
  }

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection() {
    this.logger.log('Client connected to our server');
  }

  handleDisconnect() {
    this.logger.log('Client disconnected from our server');
  }
}
