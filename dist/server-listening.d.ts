// server-listening ~ github.com/center-key/server-listening ~ MIT License
import { JSDOM } from 'jsdom';
import { Server } from 'http';
declare type ServerListeningOptions = {
    port?: number;
    name?: string;
};
declare const serverListening: {
    setPort(options?: ServerListeningOptions | undefined): void;
    ready(server: Server): Promise<Server>;
    close(server: Server): Promise<Server | Error | undefined>;
    jsdomOnLoad(dom: JSDOM): Promise<JSDOM>;
    jsdomCloseWindow(dom: JSDOM): Promise<JSDOM>;
};
export { serverListening };
