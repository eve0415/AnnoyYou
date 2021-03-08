import { Channel, Collection, DMChannel, Message, NewsChannel, TextChannel, User } from 'discord.js';
import { typing } from '../structures';

export class AnnoyManager extends Collection<User, typing> {
    public startTyping(channel: Channel, user: User): void {
        if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel)) return;

        this.set(user, new typing(channel, user));
        this.isStillTyping(user);
    }

    private isStillTyping(user: User) {
        setTimeout(() => {
            const type = this.get(user);
            if (!type) return;
            if (user.typingDurationIn(type.channel) >= 10000 && !type.sendLONGWaiting) {
                type.channel.send('まだ書いてるの？長くない？');
                type.sendLONGWaiting = true;
            }
            if (user.typingIn(type.channel)) {
                this.isStillTyping(user);
            } else {
                this.userDidntSend(user);
            }
        }, 2500);
    }

    public receivedMessage(message: Message): void {
        const type = this.get(message.author);
        if (type) type.receivedMessage = true;

        if (message.content.length >= 300) message.reply('うっせえわ');
        if (message.content.length >= 50 && !this.has(message.author)) message.reply('お前コピペしただろ');

        this.delete(message.author);
    }

    private userDidntSend(user: User): void {
        const type = this.get(user);
        if (type?.receivedMessage) return;
        type?.channel.send('言いたいことは言っちゃったほうが精神衛生上いいよ！？言わなくていいの！？ねぇ！？');
        this.delete(user);
    }
}
