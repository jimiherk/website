import {type Writable, writable} from 'svelte/store'

export default class LocalStore<T> {
    private readonly store: Writable<T>;
    private readonly key: string;

    constructor(key: string) {
        const value = localStorage.getItem(key);
        this.store = writable(value ? JSON.parse(value) : undefined);
        this.key = key;
    }

    public subscribe = () => this.store.subscribe;

    public set = (value: T) => {
        this.store.set(value);
        localStorage.setItem(this.key, JSON.stringify(value));
    };

    public update = (updater: (value: T) => T) => {
        this.store.update(updater);
        localStorage.setItem(this.key, JSON.stringify(this.store));
    };
}