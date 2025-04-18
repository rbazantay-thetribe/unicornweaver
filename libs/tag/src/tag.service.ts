import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateResult } from 'typeorm';
import { Tag } from './entities/Tag';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
    ) { }
    findAll() {
        return this.tagRepository.find();
    }

    findOne(id: number) {
        return this.tagRepository.findOneBy({ id });
    }

    create(createTagDto: CreateTagDto): Promise<Tag> {
        const tag = this.tagRepository.create(createTagDto);
        return this.tagRepository.save(tag);
    }

    update(id: number, updateTagDto: UpdateTagDto): Promise<UpdateResult> {
        return this.tagRepository.update(id, updateTagDto);
    }

    remove(id: number) {
        return this.tagRepository.delete(id);
    }
}
