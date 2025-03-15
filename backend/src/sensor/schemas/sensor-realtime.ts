import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class SensorRealTime {
  @Prop({ required: true, unique: true })
  macAddress: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}
// Schema per i dati in tempo reale con un record per macAddress
export type SensorRealTimeDocument = SensorRealTime & Document;
export const SensorRealTimeSchema =
  SchemaFactory.createForClass(SensorRealTime);
