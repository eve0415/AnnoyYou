import { Channel, User } from 'discord.js';
import { AnnoyYou } from '../main';
import { Event } from '../structures';

export default class extends Event {
    public constructor(client: AnnoyYou) {
        super(client, 'typingStart');
    }

    public run(channel: Channel, user: User): void {
        this.client.beAnnoy.startTyping(channel, user);
    }
}
