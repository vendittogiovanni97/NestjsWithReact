import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SensorData,
  SensorDataSchema,
} from 'src/sensor/schemas/sensor-strorico';
import {
  SensorRealTime,
  SensorRealTimeSchema,
} from 'src/sensor/schemas/sensor-realtime';

@Module({
  imports: [
    //registra il modello
    MongooseModule.forFeature([
      { name: SensorData.name, schema: SensorDataSchema },
      { name: SensorRealTime.name, schema: SensorRealTimeSchema },
    ]),
  ],
})
export class SensorsModule {}
