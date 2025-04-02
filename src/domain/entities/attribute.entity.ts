export class Attribute {
    constructor(
        public readonly id: number,
        public slug: string,
        public name: string,
        public multiple: number,
        public type: string,
    ) { }

    public static create(
        slug: string,
        name: string,
        multiple: number = 0,
        type: string,
    ): Omit<Attribute, 'id'> {
        return {
            slug,
            name,
            multiple,
            type,
        };
    }
} 