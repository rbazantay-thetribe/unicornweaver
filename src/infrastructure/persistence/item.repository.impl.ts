import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from '../../domain/entities/item.entity';
import { ItemRepository } from '../../domain/repositories/item.repository';
import { ItemEntity } from './item.entity';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
    constructor(
        private readonly repository: Repository<ItemEntity>,
    ) { }

    async findAll(): Promise<Item[]> {
        const items = await this.repository.find();
        return items.map((item) => this.mapToEntity(item));
    }

    async findById(id: number): Promise<Item | null> {
        const item = await this.repository.findOne({ where: { id } });
        return item ? this.mapToEntity(item) : null;
    }

    async findBySlug(slug: string): Promise<Item | null> {
        const item = await this.repository.findOne({ where: { slug } });
        return item ? this.mapToEntity(item) : null;
    }

    async create(itemData: Omit<Item, 'id'>): Promise<Item> {
        const item = await this.repository.save(itemData);
        return this.mapToEntity(item);
    }

    async update(id: number, itemData: Partial<Item>): Promise<Item> {
        await this.repository.update(id, itemData);
        const updatedItem = await this.repository.findOne({ where: { id } });
        if (!updatedItem) {
            throw new Error(`Item with id ${id} not found`);
        }
        return this.mapToEntity(updatedItem);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private mapToEntity(data: ItemEntity): Item {
        return new Item(data.id, data.name, data.slug);
    }
} 