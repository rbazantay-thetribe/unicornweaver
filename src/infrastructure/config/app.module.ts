import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '../api/item.module';
import { AttributeModule } from '../api/attribute.module';
import { TagModule } from '../api/tag.module';
import { ItemEntity } from '../persistence/item.entity';
import { AttributeEntity } from '../persistence/attribute.entity';
import { TagEntity } from '../persistence/tag.entity';
import { ItemAttributeEntity } from '../persistence/item-attribute.entity';
import { ItemItemEntity } from '../persistence/item-item.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [
                ItemEntity,
                AttributeEntity,
                TagEntity,
                ItemAttributeEntity,
                ItemItemEntity,
            ],
            synchronize: true,
            logging: true,
        }),
        ItemModule,
        AttributeModule,
        TagModule,
    ],
})
export class AppModule { } 