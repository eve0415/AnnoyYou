import { AnnoyYou } from '../main';
import { Event } from '../structures';

export default class extends Event {
    public constructor(client: AnnoyYou) {
        super(client, 'ready');
    }

    public run(): void {
        console.info('Succesfully logged in and is Ready.');
    }
}
