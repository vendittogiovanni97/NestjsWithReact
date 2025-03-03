// src/sensor-data/sensor-data.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorData } from './schemas/sensor-strorico';
import { SensorRealTime } from './schemas/sensor-realtime';

@Controller('sensor')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Get('historical')
  async getHistoricalData(): Promise<SensorData[]> {
    return this.sensorDataService.getAllHistoricalData();
  }

  @Get('realtime')
  async getRealtimeData(): Promise<SensorRealTime[]> {
    return this.sensorDataService.getAllRealtimeData();
  }
}
