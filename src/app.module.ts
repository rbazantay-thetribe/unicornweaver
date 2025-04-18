import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Attribute } from '../libs/attribute/src/entities/Attribute';
import { Tag } from '../libs/tag/src/entities/Tag';
import { TagAttribute } from '../libs/attribute/src/entities/TagAttribute';
import { Item } from '../libs/item/src/entities/Item';
import { ItemAttribute } from '../libs/item/src/entities/ItemAttribute';
import { TagItem } from '../libs/item/src/entities/TagItem';
import { ItemItem } from '../libs/item/src/entities/ItemItem';
import { ItemModule } from '../libs/item/src/item.module';
import { ItemController } from '../libs/item/src/item.controller';
import { ItemService } from '../libs/item/src/item.service';
import { TagModule } from '../libs/tag/src/tag.module';
import { TagController } from '../libs/tag/src/tag.controller';
import { TagService } from '../libs/tag/src/tag.service';
import { AttributeModule } from '../libs/attribute/src/attribute.module';
import { AttributeController } from '../libs/attribute/src/attribute.controller';
import { AttributeService } from '../libs/attribute/src/attribute.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db.sqlite',
      entities: [
        Attribute,
        Tag,
        TagAttribute,
        Item,
        ItemAttribute,
        TagItem,
        ItemItem,
      ],
      synchronize: true,
    }),
    ItemModule,
    TagModule,
    AttributeModule,
  ],
  controllers: [AppController, ItemController, TagController, AttributeController],
  providers: [AppService, ItemService, TagService, AttributeService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
