import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';

@Entity('tags')
export class TagEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    slug: string;

    @Column('blob')
    name: string;

    @Column({ name: 'parent_id', nullable: true })
    parentId: number | null;

    @ManyToOne(() => TagEntity, tag => tag.children)
    @JoinColumn({ name: 'parent_id' })
    parent: TagEntity;

    @ManyToMany(() => TagEntity, tag => tag.parent)
    children: TagEntity[];

    @ManyToMany(() => AttributeEntity, attribute => attribute.tags)
    @JoinTable({
        name: 'tag_attribute',
        joinColumn: { name: 'tag_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'attribute_id', referencedColumnName: 'id' },
    })
    attributes: AttributeEntity[];

    @ManyToMany(() => ItemEntity, item => item.tags)
    items: ItemEntity[];
} 