export class Item {
    constructor(
        public readonly id: number,
        public slug: string,
        public name: string,
    ) { }

    public static create(
        slug: string,
        name: string,
    ): Omit<Item, 'id'> {
        return {
            slug,
            name,
        };
    }
} 