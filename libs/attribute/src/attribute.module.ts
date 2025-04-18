import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/Attribute';

@Module({
  controllers: [AttributeController],
  providers: [AttributeService],
  imports: [TypeOrmModule.forFeature([Attribute])],
  exports: [TypeOrmModule],
})
export class AttributeModule {}