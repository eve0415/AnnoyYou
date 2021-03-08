import { AnnoyYou } from '../main';

export abstract class Event {
    public readonly client: AnnoyYou;
    public readonly name: string;
    public readonly bind: (...args: unknown[]) => void;

    public constructor(client: AnnoyYou, name: string) {
        this.client = client;
        this.name = name;
        this.bind = this.run.bind(this);
    }

    public abstract run (...args: unknown[]): void;
}
