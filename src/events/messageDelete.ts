import { Message } from 'discord.js';
import { AnnoyYou } from '../main';
import { Event } from '../structures';

export default class extends Event {
    public constructor(client: AnnoyYou) {
        super(client, 'messageDelete');
    }

    public run(message: Message): void {
        if (message.author.bot) return;
        const timestamp = message.editedAt ?? message.createdAt;
        const diff = new Date().getTime() - timestamp.getTime();
        if (diff <= 5000) message.channel.send('今何を隠したんだ！言え！');
    }
}
