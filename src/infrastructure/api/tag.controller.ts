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
import { TagService } from '../../application/services/tag.service';
import { CreateTagDto, UpdateTagDto, TagDto } from './dtos/tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les tags' })
    @ApiResponse({
        status: 200,
        description: 'Liste des tags récupérée avec succès',
        type: [TagDto],
    })
    async findAll(): Promise<TagDto[]> {
        return this.tagService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un tag par son ID' })
    @ApiResponse({
        status: 200,
        description: 'Tag trouvé',
        type: TagDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tag non trouvé',
    })
    async findById(@Param('id') id: number): Promise<TagDto> {
        const tag = await this.tagService.findById(id);
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Récupérer un tag par son slug' })
    @ApiResponse({
        status: 200,
        description: 'Tag trouvé',
        type: TagDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tag non trouvé',
    })
    async findBySlug(@Param('slug') slug: string): Promise<TagDto> {
        const tag = await this.tagService.findBySlug(slug);
        if (!tag) {
            throw new NotFoundException(`Tag with slug ${slug} not found`);
        }
        return tag;
    }

    @Get('parent/:parentId')
    @ApiOperation({ summary: 'Récupérer les tags par leur parent ID' })
    @ApiResponse({
        status: 200,
        description: 'Liste des tags enfants récupérée avec succès',
        type: [TagDto],
    })
    async findByParentId(@Param('parentId') parentId: number): Promise<TagDto[]> {
        return this.tagService.findByParentId(parentId);
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau tag' })
    @ApiResponse({
        status: 201,
        description: 'Tag créé avec succès',
        type: TagDto,
    })
    async create(@Body() createTagDto: CreateTagDto): Promise<TagDto> {
        return this.tagService.create(createTagDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un tag' })
    @ApiResponse({
        status: 200,
        description: 'Tag mis à jour avec succès',
        type: TagDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tag non trouvé',
    })
    async update(
        @Param('id') id: number,
        @Body() updateTagDto: UpdateTagDto,
    ): Promise<TagDto> {
        const tag = await this.tagService.update(id, updateTagDto);
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un tag' })
    @ApiResponse({
        status: 200,
        description: 'Tag supprimé avec succès',
    })
    @ApiResponse({
        status: 404,
        description: 'Tag non trouvé',
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.tagService.delete(+id);
    }
} 