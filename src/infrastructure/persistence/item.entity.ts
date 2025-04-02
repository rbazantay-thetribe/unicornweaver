import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { TagEntity } from './tag.entity';
import { ItemAttributeEntity } from './item-attribute.entity';
import { BaseEntity } from './base.entity';

@Entity('items')
export class ItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    slug: string;

    @Column('blob')
    name: string;

    @ManyToMany(() => TagEntity, (tag) => tag.items)
    @JoinTable({
        name: 'tag_item',
        joinColumn: { name: 'item_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    })
    tags: TagEntity[];

    @OneToMany(
        () => ItemAttributeEntity,
        (itemAttribute: ItemAttributeEntity) => itemAttribute.item,
    )
    attributes: ItemAttributeEntity[];
} 