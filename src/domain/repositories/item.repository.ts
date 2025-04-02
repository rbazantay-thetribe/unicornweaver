import { Item } from '../entities/item.entity';

export interface ItemRepository {
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    create(item: Omit<Item, 'id'>): Promise<Item>;
    update(id: number, item: Partial<Item>): Promise<Item>;
    delete(id: number): Promise<void>;
} 