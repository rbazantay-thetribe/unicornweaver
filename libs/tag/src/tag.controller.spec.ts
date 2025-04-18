import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './entities/Tag';
import { UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  const mockTagService: Partial<TagService> = {
    create: jest.fn(
      (dto: CreateTagDto): Promise<Tag> =>
        Promise.resolve({
          id: 1,
          ...dto,
        }),
    ),
    findAll: jest.fn((): Promise<Tag[]> => Promise.resolve([])),
    findOne: jest.fn(
      (id: number): Promise<Tag | null> =>
        Promise.resolve({
          id,
          slug: 'Test Tag',
        }),
    ),
    update: jest.fn().mockImplementation(
      (id: number, dto: UpdateTagDto): Promise<UpdateResult> =>
        Promise.resolve({
          raw: [{ id, ...dto }],
          generatedMaps: [],
          affected: 1,
        }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const createTagDto: CreateTagDto = {
      slug: 'Test Tag',
    };

    const result = await controller.create(createTagDto);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.slug).toBe('Test Tag');
    expect(jest.spyOn(service, 'create')).toHaveBeenCalledWith(createTagDto);
  });

  it('should find all items', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
  });

  it('should find one item', async () => {
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(result?.slug).toBe('Test Tag');
  });

  it('should update an item', async () => {
    const updateTagDto: UpdateTagDto = {
      slug: 'Updated Tag',
    };

    const result = await controller.update(1, updateTagDto);
    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });
});
