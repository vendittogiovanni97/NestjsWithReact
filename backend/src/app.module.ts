import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/Users/users.module';
import { SensorsModule } from './sensor/app.module';

@Module({
  //Il forRoot()metodo accetta lo stesso oggetto di configurazione mongoose.connect()del pacchetto Mongoose//
  imports: [
    // qui stabiliamo la connessione al database
    MongooseModule.forRoot(
      process.env.DATABASE_URL ||
        'mongodb://admin:password@localhost:27017/corsoNexus',
    ),
    UsersModule,
    SensorsModule,
  ],
})
export class AppModule {}
