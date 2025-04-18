import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './entities/Item';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) { }
    findAll() {
        return this.itemRepository.find();
    }

    findOne(id: number) {
        return this.itemRepository.findOneBy({ id });
    }

    create(createItemDto: CreateItemDto): Promise<Item> {
        const item = this.itemRepository.create(createItemDto);
        return this.itemRepository.save(item);
    }

    update(id: number, updateItemDto: UpdateItemDto): Promise<UpdateResult> {
        return this.itemRepository.update(id, updateItemDto);
    }

    remove(id: number) {
        return this.itemRepository.delete(id);
    }
}
