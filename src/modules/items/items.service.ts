import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}
  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemsRepository.create(createItemDto);
    return this.itemsRepository.save(item);
  }

  update(id: number, updateItemDto: UpdateItemDto): Promise<UpdateResult> {
    return this.itemsRepository.update(id, updateItemDto);
  }

  remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
