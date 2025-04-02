import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from '../../domain/entities/attribute.entity';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AttributeEntity } from './attribute.entity';

@Injectable()
export class AttributeRepositoryImpl implements AttributeRepository {
    constructor(
        @InjectRepository(AttributeEntity)
        private readonly repository: Repository<AttributeEntity>,
    ) { }

    async findAll(): Promise<Attribute[]> {
        const attributes = await this.repository.find();
        return attributes.map(this.mapToEntity);
    }

    async findById(id: number): Promise<Attribute | null> {
        const attribute = await this.repository.findOne({ where: { id } });
        return attribute ? this.mapToEntity(attribute) : null;
    }

    async findBySlug(slug: string): Promise<Attribute | null> {
        const attribute = await this.repository.findOne({ where: { slug } });
        return attribute ? this.mapToEntity(attribute) : null;
    }

    async create(attributeData: Omit<Attribute, 'id'>): Promise<Attribute> {
        const attribute = await this.repository.save(attributeData);
        return this.mapToEntity(attribute);
    }

    async update(id: number, attributeData: Partial<Attribute>): Promise<Attribute> {
        await this.repository.update(id, attributeData);
        const updatedAttribute = await this.repository.findOne({ where: { id } });
        if (!updatedAttribute) {
            throw new Error(`Attribute with id ${id} not found`);
        }
        return this.mapToEntity(updatedAttribute);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private mapToEntity(data: AttributeEntity): Attribute {
        return new Attribute(
            data.id,
            data.slug,
            data.name,
            data.multiple,
            data.type,
        );
    }
} 