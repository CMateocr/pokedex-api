import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose'

import { join } from 'path'
import { PokemonModule } from './pokemon/pokemon.module'
import { CommonModule } from './common/common.module'
import { SeedModule } from './seed/seed.module'
import { ConfigModule } from '@nestjs/config'
import { envConfig } from './config/env.config'
import { JoiValidationSchema } from './config/joi.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGO_DB as string, {
      dbName: 'nest-pokemon',
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
