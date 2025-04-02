import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeController } from './attribute.controller';
import { AttributeService } from '../../application/services/attribute.service';

import { AttributeEntity } from '../persistence/attribute.entity';



@Module({
    imports: [TypeOrmModule.forFeature([AttributeEntity])],
    controllers: [AttributeController],
    providers: [
        AttributeService,

    ],
})
export class AttributeModule { } 