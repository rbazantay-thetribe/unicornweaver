import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/Attribute';
import { UpdateResult } from 'typeorm';


@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) { }

    @Get()
    findAll(): Promise<Attribute[]> {
        return this.attributeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Attribute | null> {
        return this.attributeService.findOne(id);
    }

    @Post()
    create(@Body() createAttributeDto: CreateAttributeDto): Promise<Attribute> {
        return this.attributeService.create(createAttributeDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ): Promise<UpdateResult> {
        return this.attributeService.update(id, updateAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.attributeService.remove(id);
    }
}
