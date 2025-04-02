import { Item } from '../../entities/item.entity';
import { CreateItemDto, UpdateItemDto } from '../../../infrastructure/api/dtos/item.dto';

export interface ItemRepository {
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    findBySlug(slug: string): Promise<Item | null>;
    create(createItemDto: CreateItemDto): Promise<Item>;
    update(id: number, updateItemDto: UpdateItemDto): Promise<Item | null>;
    delete(id: number): Promise<boolean>;
} 