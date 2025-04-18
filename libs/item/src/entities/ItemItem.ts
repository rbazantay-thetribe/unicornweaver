import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Item } from './Item';
import { ApiProperty } from '@nestjs/swagger';

@Entity('item_item')
export class ItemItem {
    @ApiProperty({ description: 'Identifiant du premier item' })
    @PrimaryColumn()
    item1Id: number;

    @ApiProperty({ description: 'Identifiant du deuxième item' })
    @PrimaryColumn()
    item2Id: number;

    @ManyToOne(() => Item, item => item.item1Relations)
    @JoinColumn({ name: 'item1_id' })
    item1: Item;

    @ManyToOne(() => Item, item => item.item2Relations)
    @JoinColumn({ name: 'item2_id' })
    item2: Item;
} 