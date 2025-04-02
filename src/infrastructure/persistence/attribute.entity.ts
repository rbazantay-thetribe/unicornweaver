import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { TagEntity } from './tag.entity';
import { BaseEntity } from './base.entity';

@Entity('attributes')
export class AttributeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    slug: string;

    @Column('blob')
    name: string;

    @Column({ default: 0 })
    multiple: number;

    @Column('text')
    type: string;

    @ManyToMany(() => TagEntity, tag => tag.attributes)
    @JoinTable({
        name: 'tag_attribute',
        joinColumn: { name: 'attribute_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    })
    tags: TagEntity[];
} 