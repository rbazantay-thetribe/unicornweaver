export class Tag {
    constructor(
        public readonly id: number,
        public slug: string,
        public name: string,
        public parentId: number | null,
    ) { }

    public static create(
        slug: string,
        name: string,
        parentId: number | null = null,
    ): Omit<Tag, 'id'> {
        return {
            slug,
            name,
            parentId,
        };
    }
} 