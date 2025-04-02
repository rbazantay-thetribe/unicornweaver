import {
    IsString,
    IsOptional,
    IsArray,
    IsNumber,
    IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDto } from './attribute.dto';
import { TagDto } from './tag.dto';
import { Item } from '../../../domain/entities/item.entity';

export class ItemAttributeValueDto {
    @ApiProperty({
        description: 'L\'identifiant de l\'attribut',
        example: 1,
    })
    @IsNumber()
    attributeId: number;

    @ApiProperty({
        description: 'La valeur de l\'attribut',
        example: 'Rouge',
    })
    @IsObject()
    value: any;
}

export class CreateItemDto {
    @ApiProperty({
        description: 'Le slug unique de l\'item',
        example: 't-shirt-rouge',
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'Le nom de l\'item',
        example: 'T-shirt Rouge',
    })
    @IsString()
    name: string;
}

export class UpdateItemDto {
    @ApiProperty({ required: false })
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    slug?: string;
}

export class ItemDto {
    @ApiProperty({
        description: 'L\'identifiant unique de l\'item',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Le slug unique de l\'item',
        example: 't-shirt-rouge',
    })
    slug: string;

    @ApiProperty({
        description: 'Le nom de l\'item',
        example: 'T-shirt Rouge',
    })
    name: string;

    static fromEntity(entity: Item): ItemDto {
        const dto = new ItemDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.slug = entity.slug;
        return dto;
    }
} 