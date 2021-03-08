import { Client } from 'discord.js';
import { AnnoyManager, EventManager } from './managers';

export class AnnoyYou extends Client {
    private readonly events: EventManager;
    public readonly beAnnoy = new AnnoyManager();

    public constructor() {
        super({
            restTimeOffset: 0,
            intents: ['GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGE_TYPING', 'GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
        });
        this.events = new EventManager(this);
    }

    public async start(): Promise<void> {
        await this.events.registerAll();
        await super.login();
    }
}
