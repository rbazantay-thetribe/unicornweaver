import { Test, TestingModule } from '@nestjs/testing';
import { AttributeService } from './attribute.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attribute } from './entities/Attribute';

describe('AttributeService', () => {
  let service: AttributeService;
  const mockAttributeRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributeService,
        {
          provide: getRepositoryToken(Attribute),
          useValue: mockAttributeRepository,
        },
      ],
    }).compile();

    service = module.get<AttributeService>(AttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
