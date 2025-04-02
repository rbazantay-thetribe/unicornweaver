import { Injectable, Inject } from '@nestjs/common';
import { Tag } from '../../../domain/entities/tag.entity';
import { TagRepository } from '../../../domain/repositories/tag.repository';

@Injectable()
export class TagService {
    constructor(
        @Inject('TagRepository')
        private readonly tagRepository: TagRepository,
    ) { }

    async getAllTags(): Promise<Tag[]> {
        return this.tagRepository.findAll();
    }

    async getTagById(id: number): Promise<Tag | null> {
        return this.tagRepository.findById(id);
    }

    async getTagBySlug(slug: string): Promise<Tag | null> {
        return this.tagRepository.findBySlug(slug);
    }

    async getTagsByParentId(parentId: number): Promise<Tag[]> {
        return this.tagRepository.findByParentId(parentId);
    }

    async createTag(tagData: Omit<Tag, 'id'>): Promise<Tag> {
        return this.tagRepository.create(tagData);
    }

    async updateTag(id: number, tagData: Partial<Tag>): Promise<Tag> {
        return this.tagRepository.update(id, tagData);
    }

    async deleteTag(id: number): Promise<void> {
        return this.tagRepository.delete(id);
    }
} 