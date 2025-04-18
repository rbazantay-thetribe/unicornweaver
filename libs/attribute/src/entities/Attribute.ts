import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TagAttribute } from './TagAttribute';
import { ItemAttribute } from '../../../item/src/entities/ItemAttribute';
import { ApiProperty } from '@nestjs/swagger';

@Entity('attributes')
export class Attribute {
    @ApiProperty({ description: 'Identifiant unique de l\'attribut' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Slug unique de l\'attribut', maxLength: 50 })
    @Column({ length: 50, unique: true })
    slug: string;


    @ApiProperty({ description: 'Indique si l\'attribut peut avoir plusieurs valeurs', default: 0 })
    @Column({ default: 0 })
    multiple: number;

    @ApiProperty({ description: 'Type de l\'attribut' })
    @Column('text')
    type: string;

    @OneToMany(() => TagAttribute, tagAttribute => tagAttribute.attribute)
    tagAttributes: TagAttribute[];

    @OneToMany(() => ItemAttribute, itemAttribute => itemAttribute.attribute)
    itemAttributes: ItemAttribute[];
} 