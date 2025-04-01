import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/items.interface';

@Injectable()
export class ItemsService {
  findAll() {
    return [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
  }

  findOne(id: string) {
    return { id: id, name: 'Item 1' };
  }

  create(item: Item) {
    return { id: 1, name: 'Item 1', item: item };
  }

  update(id: string, item: Item) {
    return { id: id, name: 'Item 1', item: item };
  }

  remove(id: string) {
    return { id: id, name: 'Item 1', message: 'Item deleted' };
  }
}
