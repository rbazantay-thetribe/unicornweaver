import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';
import { AttributeEntity } from './attribute.entity';

@Entity('item_attribute')
export class ItemAttributeEntity extends BaseEntity {
    @PrimaryColumn({ name: 'item_id' })
    itemId: number;

    @PrimaryColumn({ name: 'attribute_id' })
    attributeId: number;

    @Column('blob')
    value: any;

    @ManyToOne(() => ItemEntity, (item) => item.attributes)
    @JoinColumn({ name: 'item_id' })
    item: ItemEntity;

    @ManyToOne(() => AttributeEntity)
    @JoinColumn({ name: 'attribute_id' })
    attribute: AttributeEntity;
} 