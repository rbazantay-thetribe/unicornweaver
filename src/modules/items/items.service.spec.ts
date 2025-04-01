import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsService', () => {
  let service: ItemsService;

  const mockRepository = {
    create: jest.fn((dto: CreateItemDto): CreateItemDto => dto),
    save: jest.fn(
      (item: CreateItemDto): Promise<Item> =>
        Promise.resolve({ id: 1, ...item }),
    ),
    find: jest.fn((): Promise<Item[]> => Promise.resolve([])),
    findOneBy: jest.fn(
      ({ id }: { id: number }): Promise<Item | null> =>
        Promise.resolve({ id, slug: 'Test Item' }),
    ),
    update: jest.fn(
      (id: number, dto: UpdateItemDto): Promise<{ affected: number }> =>
        Promise.resolve({ affected: 1, ...dto }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
