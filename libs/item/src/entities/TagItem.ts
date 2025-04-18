import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Tag } from '../../../tag/src/entities/Tag';
import { Item } from '../../../item/src/entities/Item';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tag_item')
export class TagItem {
    @ApiProperty({ description: 'Identifiant du tag' })
    @PrimaryColumn()
    tagId: number;

    @ApiProperty({ description: 'Identifiant de l\'item' })
    @PrimaryColumn()
    itemId: number;

        @ManyToOne(() => Tag, tag => tag.tagItems)
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;

    @ManyToOne(() => Item, item => item.tagItems)
    @JoinColumn({ name: 'item_id' })
    item: Item;
} 