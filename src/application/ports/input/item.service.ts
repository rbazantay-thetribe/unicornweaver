import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../../../domain/entities/item.entity';
import { ItemRepository } from '../../../domain/repositories/item.repository';

@Injectable()
export class ItemService {
    constructor(
        @Inject('ItemRepository')
        private readonly itemRepository: ItemRepository,
    ) { }

    async getAllItems(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }

    async getItemById(id: number): Promise<Item | null> {
        return this.itemRepository.findById(id);
    }

    async createItem(itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
        return this.itemRepository.create(itemData);
    }

    async updateItem(id: number, itemData: Partial<Item>): Promise<Item> {
        return this.itemRepository.update(id, itemData);
    }

    async deleteItem(id: number): Promise<void> {
        return this.itemRepository.delete(id);
    }
} 