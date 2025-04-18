import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemAttribute } from './ItemAttribute';
import { TagItem } from './TagItem';
import { ItemItem } from './ItemItem';
import { ApiProperty } from '@nestjs/swagger';

@Entity('item')
export class Item {
    @ApiProperty({ description: 'Identifiant unique de l\'item' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Slug unique de l\'item', maxLength: 50 })
    @Column({ length: 50, unique: true })
    slug: string;


    @OneToMany(() => ItemAttribute, itemAttribute => itemAttribute.item)
    itemAttributes: ItemAttribute[];

    @OneToMany(() => TagItem, tagItem => tagItem.item)
    tagItems: TagItem[];

    @OneToMany(() => ItemItem, itemItem => itemItem.item1)
    item1Relations: ItemItem[];

    @OneToMany(() => ItemItem, itemItem => itemItem.item2)
    item2Relations: ItemItem[];
} 