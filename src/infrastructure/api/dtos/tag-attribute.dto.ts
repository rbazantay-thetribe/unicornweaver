import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TagAttributeDto {
    @ApiProperty({
        description: "L'identifiant de l'attribut",
        example: 1,
    })
    @IsNumber()
    attributeId: number;

    @ApiProperty({
        description: 'L\'identifiant du tag',
        example: 1,
    })
    @IsNumber()
    tagId: number;
} 