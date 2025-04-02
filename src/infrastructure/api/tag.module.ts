import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagService } from '../../application/services/tag.service';

import { TagEntity } from '../persistence/tag.entity';


@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagController],
    providers: [
        TagService,

    ],
})
export class TagModule { } 