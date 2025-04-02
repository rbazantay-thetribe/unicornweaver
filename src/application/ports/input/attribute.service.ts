import { Injectable, Inject } from '@nestjs/common';
import { Attribute } from '../../../domain/entities/attribute.entity';
import { AttributeRepository } from '../../../domain/repositories/attribute.repository';

@Injectable()
export class AttributeService {
    constructor(
        @Inject('AttributeRepository')
        private readonly attributeRepository: AttributeRepository,
    ) { }

    async getAllAttributes(): Promise<Attribute[]> {
        return this.attributeRepository.findAll();
    }

    async getAttributeById(id: number): Promise<Attribute | null> {
        return this.attributeRepository.findById(id);
    }

    async getAttributeBySlug(slug: string): Promise<Attribute | null> {
        return this.attributeRepository.findBySlug(slug);
    }

    async createAttribute(attributeData: Omit<Attribute, 'id'>): Promise<Attribute> {
        return this.attributeRepository.create(attributeData);
    }

    async updateAttribute(id: number, attributeData: Partial<Attribute>): Promise<Attribute> {
        return this.attributeRepository.update(id, attributeData);
    }

    async deleteAttribute(id: number): Promise<void> {
        return this.attributeRepository.delete(id);
    }
} 