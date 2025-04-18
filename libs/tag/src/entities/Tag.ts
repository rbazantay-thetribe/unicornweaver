import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TagAttribute } from '../../../attribute/src/entities/TagAttribute';
import { TagItem } from '../../../item/src/entities/TagItem';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tag')
export class Tag {
    @ApiProperty({ description: 'Identifiant unique du tag' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Slug unique du tag', maxLength: 50 })
    @Column({ length: 50, unique: true })
    slug: string;


    @ApiProperty({ description: 'Identifiant du tag parent', required: false })
    @Column({ nullable: true })
    parentId: number;

    @ManyToOne(() => Tag, tag => tag.children)
    @JoinColumn({ name: 'parent_id' })
    parent: Tag;

    @OneToMany(() => Tag, tag => tag.parent)
    children: Tag[];

    @OneToMany(() => TagAttribute, tagAttribute => tagAttribute.tag)
    tagAttributes: TagAttribute[];

    @OneToMany(() => TagItem, tagItem => tagItem.tag)
    tagItems: TagItem[];
} 