import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDto } from './attribute.dto';
import { Tag } from '../../../domain/entities/tag.entity';

export class CreateTagDto {
    @ApiProperty({
        description: 'Le slug unique du tag',
        example: 'vetements',
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'Le nom du tag',
        example: 'Vêtements',
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'L\'identifiant du tag parent',
        example: null,
    })
    @IsNumber()
    @IsOptional()
    parentId: number | null;

    @ApiPropertyOptional({
        description: 'Les identifiants des attributs associés',
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    attributeIds?: number[];
}

export class UpdateTagDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({
        description: 'L\'identifiant du tag parent',
        example: null,
    })
    @IsNumber()
    @IsOptional()
    parentId?: number | null;

    @ApiPropertyOptional({
        description: 'Les identifiants des attributs associés',
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    attributeIds?: number[];
}

export class TagDto {
    @ApiProperty({
        description: 'L\'identifiant unique du tag',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Le slug unique du tag',
        example: 'vetements',
    })
    slug: string;

    @ApiProperty({
        description: 'Le nom du tag',
        example: 'Vêtements',
    })
    name: string;

    @ApiPropertyOptional({
        description: 'L\'identifiant du tag parent',
        example: null,
    })
    parentId: number | null;

    @ApiProperty({
        description: 'Les attributs associés',
        type: [AttributeDto],
    })
    attributes: AttributeDto[];

    @ApiProperty({
        description: 'La date de création du tag',
        example: '2024-03-20T10:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'La date de dernière mise à jour du tag',
        example: '2024-03-20T10:00:00Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: 'La date de suppression du tag (si supprimé)',
        example: null,
    })
    deletedAt?: Date;

    static fromEntity(entity: Tag): TagDto {
        const dto = new TagDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.slug = entity.slug;
        dto.parentId = entity.parentId;
        return dto;
    }
} 