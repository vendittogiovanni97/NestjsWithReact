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
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';

@Module({
  imports: [
    //registra il modello
    MongooseModule.forFeature([
      { name: SensorData.name, schema: SensorDataSchema },
      { name: SensorRealTime.name, schema: SensorRealTimeSchema },
    ]),
  ],
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorsModule {}
