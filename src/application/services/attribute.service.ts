
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import {
  CreateAttributeDto,
  UpdateAttributeDto,
  AttributeDto,
} from '../../infrastructure/api/dtos/attribute.dto';



export class AttributeService {
    constructor(
        private readonly attributeRepository: AttributeRepository,
    ) { }

    async findAll(): Promise<AttributeDto[]> {
        const attributes = await this.attributeRepository.findAll();
        return attributes.map((attribute) => AttributeDto.fromEntity(attribute));
    }

    async findById(id: number): Promise<AttributeDto | null> {
        const attribute = await this.attributeRepository.findById(id);
        return attribute ? AttributeDto.fromEntity(attribute) : null;
    }

    async findBySlug(slug: string): Promise<AttributeDto | null> {
        const attribute = await this.attributeRepository.findBySlug(slug);
        return attribute ? AttributeDto.fromEntity(attribute) : null;
    }

    async create(createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
        const attribute = await this.attributeRepository.create(createAttributeDto);
        return AttributeDto.fromEntity(attribute);
    }

    async update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<AttributeDto | null> {
        const attribute = await this.attributeRepository.update(id, updateAttributeDto);
        return attribute ? AttributeDto.fromEntity(attribute) : null;
    }

    async delete(id: number): Promise<void> {
        await this.attributeRepository.delete(id);
    }
} 