import { readdirSync } from 'fs';
import { resolve } from 'path';
import { Collection } from 'discord.js';
import { AnnoyYou } from '../main';
import { Event } from '../structures';


export class EventManager extends Collection<string, Event> {
    private readonly client: AnnoyYou;

    public constructor(client: AnnoyYou) {
        super();
        this.client = client;
    }

    public register(event: Event): void {
        console.info(`Registering event: ${event.name}`);
        event.client.on(event.name, event.bind);
        if (this.has(event.name)) console.error(`Failed to register ${event.name} `, `${event.name} is used`);
        this.set(event.name, event);
    }

    public unregister(key: string): void {
        if (!this.has(key)) console.error(`Failed to unregister ${key} `, `${key} does not exist.`);
        console.info(`Unregistering event: ${this.get(key)?.name}`);
        const event = this.get(key) as Event;
        this.get(key)?.client.removeListener(event.name, event.bind);
        this.delete(key);
    }

    public async registerAll(): Promise<void> {
        console.info('Trying to register all events');
        const dir = resolve(`${__dirname}/../events`);
        const modules = await Promise.all(readdirSync(dir).filter(file => /.js|.ts/.exec(file)).map(file => this.loadModule(`${dir}/${file}`)));
        const result = modules.filter<Event>((value): value is Event => value instanceof Event);
        await Promise.all(result.map(value => this.register(value)));
        console.info(`Successfully registered ${this.size} Discord events`);
    }

    public unregisterAll(): Promise<unknown> {
        console.info('Trying to unregister all Discord events');
        return Promise.all(this.keyArray().map(key => this.unregister(key)));
    }

    private async loadModule(absolutePath: string): Promise<unknown> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return create((await import(absolutePath)).default, this.client);
        } catch (e) {
            return new Error(e);
        }
    }
}

class A {}
type Type<T> = new (...args: unknown[]) => T;
const create = (ctor: Type<A>, client: AnnoyYou): A => new ctor(client);
