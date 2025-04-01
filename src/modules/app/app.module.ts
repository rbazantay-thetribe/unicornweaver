import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from '../items/items.module';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [ItemsModule, EntityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
