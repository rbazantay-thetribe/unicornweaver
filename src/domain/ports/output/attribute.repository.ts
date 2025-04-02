import { Attribute } from '../../entities/attribute.entity';
import { CreateAttributeDto, UpdateAttributeDto } from '../../../infrastructure/api/dtos/attribute.dto';

export interface AttributeRepository {
    findAll(): Promise<Attribute[]>;
    findById(id: number): Promise<Attribute | null>;
    findBySlug(slug: string): Promise<Attribute | null>;
    create(createAttributeDto: CreateAttributeDto): Promise<Attribute>;
    update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<Attribute | null>;
    delete(id: number): Promise<boolean>;
} 