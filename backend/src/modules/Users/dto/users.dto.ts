import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail() //Controlla che l’email sia valida
  @IsString() //Controlla che il valore sia una stringa.
  @IsNotEmpty() //Non permette che il campo sia vuoto(né null, né undefined, né stringa vuota "").
  email: string;
  @IsNotEmpty()
  age: number;
  @IsArray()
  hobbies: string[];
}

export class FindParamasId {
  @IsMongoId()
  id: number;
}
