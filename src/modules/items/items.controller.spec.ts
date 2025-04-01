import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { UpdateResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  const mockItemsService: Partial<ItemsService> = {
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
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
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
