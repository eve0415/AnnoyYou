import { DMChannel, NewsChannel, TextChannel, User } from 'discord.js';

export class typing {
    public readonly channel: TextChannel | DMChannel | NewsChannel;
    public readonly user: User;
    public sendLONGWaiting = false;
    public receivedMessage = false;

    public constructor(channel: TextChannel | DMChannel | NewsChannel, user: User) {
        this.channel = channel;
        this.user = user;
    }
}
