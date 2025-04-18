import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Item } from './Item';
import { Attribute } from '../../../attribute/src/entities/Attribute';
import { ApiProperty } from '@nestjs/swagger';

@Entity('item_attribute')
export class ItemAttribute {
    @ApiProperty({ description: 'Identifiant de l\'attribut' })
    @PrimaryColumn()
    attributeId: number;

    @ApiProperty({ description: 'Identifiant de l\'item' })
    @PrimaryColumn()
    itemId: number;

    @ApiProperty({ description: 'Valeur de l\'attribut pour l\'item' })
    @Column('blob')
    value: Buffer;

    @ManyToOne(() => Attribute, attribute => attribute.itemAttributes)
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @ManyToOne(() => Item, item => item.itemAttributes)
    @JoinColumn({ name: 'item_id' })
    item: Item;
} 