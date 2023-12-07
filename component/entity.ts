import { v4 as uuid } from 'uuid';

export abstract class Entity {
    protected _id: string;

    get id(): string {
        return this._id;
    }

    protected constructor(id?: string | null) {
        this._id = id ?? uuid();
    }
}
