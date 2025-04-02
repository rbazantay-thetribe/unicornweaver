import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ItemEntity } from './item.entity';

@Entity('item_item')
export class ItemItemEntity {
    @PrimaryColumn({ name: 'item1_id' })
    item1Id: number;

    @PrimaryColumn({ name: 'item2_id' })
    item2Id: number;

    @ManyToOne(() => ItemEntity)
    @JoinColumn({ name: 'item1_id' })
    item1: ItemEntity;

    @ManyToOne(() => ItemEntity)
    @JoinColumn({ name: 'item2_id' })
    item2: ItemEntity;
} 