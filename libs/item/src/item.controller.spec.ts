import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './entities/Item';
import { UpdateResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  const mockItemService: Partial<ItemService> = {
    create: jest.fn(
      (dto: CreateItemDto): Promise<Item> =>
        Promise.resolve({
          id: 1,
          ...dto,
        }),
    ),
    findAll: jest.fn((): Promise<Item[]> => Promise.resolve([])),
    findOne: jest.fn(
      (id: number): Promise<Item | null> =>
        Promise.resolve({
          id,
          slug: 'Test Item',
        }),
    ),
    update: jest.fn().mockImplementation(
      (id: number, dto: UpdateItemDto): Promise<UpdateResult> =>
        Promise.resolve({
          raw: [{ id, ...dto }],
          generatedMaps: [],
          affected: 1,
        }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const createItemDto: CreateItemDto = {
      slug: 'Test Item',
    };

    const result = await controller.create(createItemDto);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.slug).toBe('Test Item');
    expect(jest.spyOn(service, 'create')).toHaveBeenCalledWith(createItemDto);
  });

  it('should find all items', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
  });

  it('should find one item', async () => {
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(result?.slug).toBe('Test Item');
  });

  it('should update an item', async () => {
    const updateItemDto: UpdateItemDto = {
      slug: 'Updated Item',
    };

    const result = await controller.update(1, updateItemDto);
    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });
});
