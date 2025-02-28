import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  macAddress: string;
  @IsString() //Controlla che il valore sia una stringa.
  @IsNotEmpty() //Non permette che il campo sia vuoto(né null, né undefined, né stringa vuota "").
  temperature: string;
  @IsNotEmpty()
  humidity: number;
  @IsNotEmpty()
  pressure: string;
}
