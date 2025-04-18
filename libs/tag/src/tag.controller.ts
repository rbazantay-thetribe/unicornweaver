import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete, 
    Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/Tag';
import { UpdateResult } from 'typeorm';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get()
    findAll(): Promise<Tag[]> {
        return this.tagService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Tag | null> {
        return this.tagService.findOne(id);
    }

    @Post()
    create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tagService.create(createTagDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateTagDto: UpdateTagDto,
    ): Promise<UpdateResult> {
        return this.tagService.update(id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.tagService.remove(id);
    }
}
