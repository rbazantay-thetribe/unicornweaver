import { Tag } from '../../entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from '../../../infrastructure/api/dtos/tag.dto';

export interface TagRepository {
    findAll(): Promise<Tag[]>;
    findById(id: number): Promise<Tag | null>;
    findBySlug(slug: string): Promise<Tag | null>;
    findByParentId(parentId: number): Promise<Tag[]>;
    create(createTagDto: CreateTagDto): Promise<Tag>;
    update(id: number, updateTagDto: UpdateTagDto): Promise<Tag | null>;
    delete(id: number): Promise<boolean>;
} 