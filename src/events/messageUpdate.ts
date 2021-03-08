import { Message } from 'discord.js';
import { AnnoyYou } from '../main';
import { Event } from '../structures';

export default class extends Event {
    public constructor(client: AnnoyYou) {
        super(client, 'messageUpdate');
    }

    public run(_oldMessage: Message, newMessage: Message): void {
        newMessage.reply('今何を隠したんだ！言え！');
    }
}
