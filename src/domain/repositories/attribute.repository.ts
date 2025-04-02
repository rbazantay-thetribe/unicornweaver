import { Attribute } from '../entities/attribute.entity';

export interface AttributeRepository {
    findAll(): Promise<Attribute[]>;
    findById(id: number): Promise<Attribute | null>;
    create(attribute: Omit<Attribute, 'id'>): Promise<Attribute>;
    update(id: number, attribute: Partial<Attribute>): Promise<Attribute>;
    delete(id: number): Promise<void>;
    findBySlug(slug: string): Promise<Attribute | null>;
} 