import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/Item';
import { UpdateResult } from 'typeorm';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Item | null> {
        return this.itemService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.create(createItemDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateItemDto: UpdateItemDto,
    ): Promise<UpdateResult> {
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.itemService.remove(id);
    }
}
