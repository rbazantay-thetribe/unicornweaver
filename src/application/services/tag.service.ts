
import { TagRepository } from '../../domain/repositories/tag.repository';
import {
  CreateTagDto,
  UpdateTagDto,
  TagDto,
} from '../../infrastructure/api/dtos/tag.dto';



export class TagService {
    constructor(
        private readonly tagRepository: TagRepository,
    ) { }

    async findAll(): Promise<TagDto[]> {
        const tags = await this.tagRepository.findAll();
        return tags.map((tag) => TagDto.fromEntity(tag));
    }

    async findById(id: number): Promise<TagDto | null> {
        const tag = await this.tagRepository.findById(id);
        return tag ? TagDto.fromEntity(tag) : null;
    }

    async findBySlug(slug: string): Promise<TagDto | null> {
        const tag = await this.tagRepository.findBySlug(slug);
        return tag ? TagDto.fromEntity(tag) : null;
    }

    async findByParentId(parentId: number): Promise<TagDto[]> {
        const tags = await this.tagRepository.findByParentId(parentId);
        return tags.map(tag => TagDto.fromEntity(tag));
    }

    async create(createTagDto: CreateTagDto): Promise<TagDto> {
        const tag = await this.tagRepository.create(createTagDto);
        return TagDto.fromEntity(tag);
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<TagDto | null> {
        const tag = await this.tagRepository.update(id, updateTagDto);
        return tag ? TagDto.fromEntity(tag) : null;
    }

    async delete(id: number): Promise<void> {
        await this.tagRepository.delete(id);
    }
} 