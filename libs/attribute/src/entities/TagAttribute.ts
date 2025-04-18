import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Tag } from '../../../tag/src/entities/Tag';
import { Attribute } from './Attribute';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tag_attribute')
export class TagAttribute {
    @ApiProperty({ description: 'Identifiant de l\'attribut' })
    @PrimaryColumn()
    attributeId: number;

    @ApiProperty({ description: 'Identifiant du tag' })
    @PrimaryColumn()
    tagId: number;

    @ManyToOne(() => Attribute, attribute => attribute.tagAttributes)
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @ManyToOne(() => Tag, tag => tag.tagAttributes)
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;
} 