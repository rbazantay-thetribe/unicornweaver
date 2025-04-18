import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeDto {
  @ApiProperty({ description: 'The slug of the attribute' })
  slug: string;
}
