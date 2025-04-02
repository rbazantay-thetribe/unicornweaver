import { IsString, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Attribute } from '../../../domain/entities/attribute.entity';

export enum AttributeType {
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
}

export class CreateAttributeDto {
    @ApiProperty({
        description: 'Le slug unique de l\'attribut',
        example: 'couleur',
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'Le nom de l\'attribut',
        example: 'Couleur',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Indique si l\'attribut peut avoir plusieurs valeurs',
        example: 0,
    })
    @IsNumber()
    multiple: number;

    @ApiProperty({
        description: 'Le type de l\'attribut',
        example: 'string',
    })
    @IsString()
    type: string;
}

export class UpdateAttributeDto {
    @ApiProperty({ required: false })
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    slug?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    multiple?: number;

    @ApiProperty({ required: false })
    @IsString()
    type?: string;
}

export class AttributeDto {
    @ApiProperty({
        description: 'L\'identifiant unique de l\'attribut',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Le slug unique de l\'attribut',
        example: 'couleur',
    })
    slug: string;

    @ApiProperty({
        description: 'Le nom de l\'attribut',
        example: 'Couleur',
    })
    name: string;

    @ApiProperty({
        description: 'Indique si l\'attribut peut avoir plusieurs valeurs',
        example: 0,
    })
    multiple: number;

    @ApiProperty({
        description: 'Le type de l\'attribut',
        example: 'string',
    })
    type: string;

    @ApiProperty({
        description: 'La date de création de l\'attribut',
        example: '2024-03-20T10:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'La date de dernière mise à jour de l\'attribut',
        example: '2024-03-20T10:00:00Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: 'La date de suppression de l\'attribut (si supprimé)',
        example: null,
    })
    deletedAt?: Date;

    static fromEntity(entity: Attribute): AttributeDto {
        const dto = new AttributeDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.slug = entity.slug;
        dto.multiple = entity.multiple;
        dto.type = entity.type;
        return dto;
    }
} 