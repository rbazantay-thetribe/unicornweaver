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
import { ItemService } from '../../application/services/item.service';
import { CreateItemDto, UpdateItemDto, ItemDto } from './dtos/item.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les items' })
    @ApiResponse({
        status: 200,
        description: 'Liste des items récupérée avec succès',
        type: [ItemDto],
    })
    async findAll(): Promise<ItemDto[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un item par son ID' })
    @ApiResponse({
        status: 200,
        description: 'Item récupéré avec succès',
        type: ItemDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Item non trouvé',
    })
    async findById(@Param('id') id: string): Promise<ItemDto> {
        const item = await this.itemService.findById(+id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return item;
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouvel item' })
    @ApiResponse({
        status: 201,
        description: 'Item créé avec succès',
        type: ItemDto,
    })
    async create(@Body() createItemDto: CreateItemDto): Promise<ItemDto> {
        return this.itemService.create(createItemDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un item' })
    @ApiResponse({
        status: 200,
        description: 'Item mis à jour avec succès',
        type: ItemDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Item non trouvé',
    })
    async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<ItemDto> {
        const item = await this.itemService.update(+id, updateItemDto);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return item;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un item' })
    @ApiResponse({
        status: 200,
        description: 'Item supprimé avec succès',
    })
    @ApiResponse({
        status: 404,
        description: 'Item non trouvé',
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.itemService.delete(+id);
    }
} 