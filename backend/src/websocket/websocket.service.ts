import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSensorDto } from 'src/sensor/dto/sensor.dto';
import {
  SensorData,
  SensorDataDocument,
} from 'src/sensor/schemas/sensor-strorico';

@Injectable()
export class SensorSerivice {
  constructor(
    @InjectModel(SensorData.name)
    private serviceModel: Model<SensorDataDocument>,
  ) {}

  async upsert(upsertSensorData: CreateSensorDto): Promise<CreateSensorDto> {
    
  }
}
