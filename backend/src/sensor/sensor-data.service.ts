// src/sensor-data/sensor-data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SensorRealTime,
  SensorRealTimeDocument,
} from 'src/sensor/schemas/sensor-realtime';
import {
  SensorData,
  SensorDataDocument,
} from 'src/sensor/schemas/sensor-strorico';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectModel(SensorData.name)
    private sensorDataModel: Model<SensorDataDocument>,
    @InjectModel(SensorRealTime.name)
    private realtimeDataModel: Model<SensorRealTimeDocument>,
  ) {}

  // Salva i dati storici
  async saveHistoricalData(data: any): Promise<SensorData> {
    const newData = new this.sensorDataModel(data);
    return newData.save();
  }

  // Aggiorna o crea dati in tempo reale (upsert)
  async updateRealtimeData(data: any): Promise<SensorRealTime> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { macAddress } = data;

    // Aggiorna il record se esiste, altrimenti lo crea
    const updatedData = await this.realtimeDataModel.findOneAndUpdate(
      { macAddress },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      { ...data, lastUpdate: new Date() },
      { new: true, upsert: true },
    );

    return updatedData;
  }

  // Ottieni tutti i dati storici
  async getAllHistoricalData(): Promise<SensorData[]> {
    return this.sensorDataModel.find().sort({ timestamp: -1 }).exec();
  }

  // Ottieni tutti i dati in tempo reale
  async getAllRealtimeData(): Promise<SensorRealTime[]> {
    return this.realtimeDataModel.find().exec();
  }
}
