import { Message } from 'discord.js';
import { AnnoyYou } from '../main';
import { Event } from '../structures';

export default class extends Event {
    public constructor(client: AnnoyYou) {
        super(client, 'message');
    }

    public run(message: Message): void {
        message.channel._typing.delete(message.author.id);
        this.client.beAnnoy.receivedMessage(message);
    }
}
