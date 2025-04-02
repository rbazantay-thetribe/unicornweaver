import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../domain/entities/tag.entity';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
    constructor(
        @InjectRepository(TagEntity)
        private readonly repository: Repository<TagEntity>,
    ) { }

    async findAll(): Promise<Tag[]> {
        const tags = await this.repository.find();
        return tags.map(this.mapToEntity);
    }

    async findById(id: number): Promise<Tag | null> {
        const tag = await this.repository.findOne({ where: { id } });
        return tag ? this.mapToEntity(tag) : null;
    }

    async findBySlug(slug: string): Promise<Tag | null> {
        const tag = await this.repository.findOne({ where: { slug } });
        return tag ? this.mapToEntity(tag) : null;
    }

    async findByParentId(parentId: number): Promise<Tag[]> {
        const tags = await this.repository.find({ where: { parentId } });
        return tags.map(this.mapToEntity);
    }

    async create(tagData: Omit<Tag, 'id'>): Promise<Tag> {
        const tag = await this.repository.save(tagData);
        return this.mapToEntity(tag);
    }

    async update(id: number, tagData: Partial<Tag>): Promise<Tag> {
        await this.repository.update(id, tagData);
        const updatedTag = await this.repository.findOne({ where: { id } });
        if (!updatedTag) {
            throw new Error(`Tag with id ${id} not found`);
        }
        return this.mapToEntity(updatedTag);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private mapToEntity(data: TagEntity): Tag {
        return new Tag(
            data.id,
            data.slug,
            data.name,
            data.parentId,
        );
    }
} 