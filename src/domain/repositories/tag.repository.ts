import { Tag } from '../entities/tag.entity';

export interface TagRepository {
    findAll(): Promise<Tag[]>;
    findById(id: number): Promise<Tag | null>;
    create(tag: Omit<Tag, 'id'>): Promise<Tag>;
    update(id: number, tag: Partial<Tag>): Promise<Tag>;
    delete(id: number): Promise<void>;
    findBySlug(slug: string): Promise<Tag | null>;
    findByParentId(parentId: number): Promise<Tag[]>;
} 