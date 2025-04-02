import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from '../../application/services/item.service';
import { ItemRepositoryImpl } from '../persistence/item.repository.impl';
import { ItemEntity } from '../persistence/item.entity';

export const ITEM_REPOSITORY = 'ITEM_REPOSITORY';

@Module({
    imports: [TypeOrmModule.forFeature([ItemEntity])],
    controllers: [ItemController],
    providers: [
        ItemService,
        {
            provide: ITEM_REPOSITORY,
            useFactory: (repository) => new ItemRepositoryImpl(repository),
            inject: [getRepositoryToken(ItemEntity)],
        },
    ],
    exports: [ItemService],
})
export class ItemModule { } 