
import {
    CreateItemDto,
    UpdateItemDto,
    ItemDto,
} from '../../infrastructure/api/dtos/item.dto';
import { ItemRepository } from '../../domain/repositories/item.repository';


export class ItemService {
    constructor(
        private readonly itemRepository: ItemRepository,
    ) { }

    async findAll(): Promise<ItemDto[]> {
        const items = await this.itemRepository.findAll();
        return items.map((item) => ItemDto.fromEntity(item));
    }

    async findById(id: number): Promise<ItemDto | null> {
        const item = await this.itemRepository.findById(id);
        return item ? ItemDto.fromEntity(item) : null;
    }

    async create(createItemDto: CreateItemDto): Promise<ItemDto> {
        const item = await this.itemRepository.create(createItemDto);
        return ItemDto.fromEntity(item);
    }

    async update(id: number, updateItemDto: UpdateItemDto): Promise<ItemDto | null> {
        const item = await this.itemRepository.update(id, updateItemDto);
        return item ? ItemDto.fromEntity(item) : null;
    }

    async delete(id: number): Promise<void> {
        await this.itemRepository.delete(id);
    }
} 