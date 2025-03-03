import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class SensorData {
  @Prop({ required: true })
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
//Schema per i dati storici con timestamp per ogni lettura
export type SensorDataDocument = SensorData & Document;
export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
