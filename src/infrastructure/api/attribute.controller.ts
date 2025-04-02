import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AttributeService } from '../../application/services/attribute.service';
import { CreateAttributeDto, UpdateAttributeDto, AttributeDto } from './dtos/attribute.dto';

@ApiTags('attributes')
@Controller('attributes')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) { }

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les attributs' })
    @ApiResponse({
        status: 200,
        description: 'Liste des attributs récupérée avec succès',
        type: [AttributeDto],
    })
    async findAll(): Promise<AttributeDto[]> {
        return this.attributeService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un attribut par son ID' })
    @ApiResponse({
        status: 200,
        description: 'Attribut trouvé',
        type: AttributeDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Attribut non trouvé',
    })
    async findById(@Param('id') id: number): Promise<AttributeDto> {
        const attribute = await this.attributeService.findById(id);
        if (!attribute) {
            throw new NotFoundException(`Attribute with ID ${id} not found`);
        }
        return attribute;
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Récupérer un attribut par son slug' })
    @ApiResponse({
        status: 200,
        description: 'Attribut trouvé',
        type: AttributeDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Attribut non trouvé',
    })
    async findBySlug(@Param('slug') slug: string): Promise<AttributeDto> {
        const attribute = await this.attributeService.findBySlug(slug);
        if (!attribute) {
            throw new NotFoundException(`Attribute with slug ${slug} not found`);
        }
        return attribute;
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouvel attribut' })
    @ApiResponse({
        status: 201,
        description: 'Attribut créé avec succès',
        type: AttributeDto,
    })
    async create(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
        return this.attributeService.create(createAttributeDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un attribut' })
    @ApiResponse({
        status: 200,
        description: 'Attribut mis à jour avec succès',
        type: AttributeDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Attribut non trouvé',
    })
    async update(
        @Param('id') id: number,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ): Promise<AttributeDto> {
        const attribute = await this.attributeService.update(id, updateAttributeDto);
        if (!attribute) {
            throw new NotFoundException(`Attribute with ID ${id} not found`);
        }
        return attribute;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un attribut' })
    @ApiResponse({
        status: 200,
        description: 'Attribut supprimé avec succès',
    })
    @ApiResponse({
        status: 404,
        description: 'Attribut non trouvé',
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.attributeService.delete(+id);
    }
} 