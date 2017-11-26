export interface Account {

}

export interface Tweet {

}

export interface Repository<T> {
    create(): Promise<T[]>;
    read(filter?: Partial<T>): Promise<T[]>;
    update(update: Partial<T>): Promise<number>;
    delete(filter?: Partial<T>): Promise<number>;
}
