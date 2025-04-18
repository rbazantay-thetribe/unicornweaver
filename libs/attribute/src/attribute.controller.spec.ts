import { Test, TestingModule } from '@nestjs/testing';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { Attribute } from './entities/Attribute';
import { UpdateResult } from 'typeorm';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

describe('AttributeController', () => {
  let controller: AttributeController;
  let service: AttributeService;

  const mockAttributeService: Partial<AttributeService> = {
    create: jest.fn(
      (dto: CreateAttributeDto): Promise<Attribute> =>
        Promise.resolve({
          id: 1,
          ...dto,
        }),
    ),
    findAll: jest.fn((): Promise<Attribute[]> => Promise.resolve([])),
    findOne: jest.fn(
      (id: number): Promise<Attribute | null> =>
        Promise.resolve({
          id,
          slug: 'Test Attribute',
        }),
    ),
    update: jest.fn().mockImplementation(
      (id: number, dto: UpdateAttributeDto): Promise<UpdateResult> =>
        Promise.resolve({
          raw: [{ id, ...dto }],
          generatedMaps: [],
          affected: 1,
        }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeController],
      providers: [
        {
          provide: AttributeService,
          useValue: mockAttributeService,
        },
      ],
    }).compile();

    controller = module.get<AttributeController>(AttributeController);
    service = module.get<AttributeService>(AttributeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an attribute', async () => {
    const createAttributeDto: CreateAttributeDto = {
      slug: 'Test Attribute',
    };

    const result = await controller.create(createAttributeDto);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.slug).toBe('Test Attribute');
    expect(jest.spyOn(service, 'create')).toHaveBeenCalledWith(createAttributeDto);
  });

  it('should find all attributes', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
  });

  it('should find one attribute', async () => {
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(result?.slug).toBe('Test Attribute');
  });

  it('should update an attribute', async () => {
    const updateAttributeDto: UpdateAttributeDto = {
      slug: 'Updated Attribute',
    };

    const result = await controller.update(1, updateAttributeDto);
    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });
});
