// server-listening ~ github.com/center-key/server-listening ~ MIT License
const serverListening = {
    setPort(options) {
        const defaults = { port: 0, name: 'port' };
        const { port, name } = { ...defaults, ...options };
        process.env[name] = String(port);
    },
    ready(server) {
        const waitForReady = (done) => server.on('listening', done);
        return new Promise(resolve => server.listening ? resolve(server) : waitForReady(resolve));
    },
    close(server) {
        return new Promise(resolve => server.close(resolve));
    },
    jsdomOnLoad(dom) {
        const name = dom && dom.constructor && dom.constructor.name;
        if (name !== 'JSDOM')
            throw Error(`serverListening - Unable to load DOM: ${name} => ${String(dom)}`);
        let done;
        dom.window.onload = () => done(dom);
        return new Promise(resolve => done = resolve);
    },
    jsdomCloseWindow(dom) {
        if (dom)
            dom.window.close();
        return new Promise(resolve => resolve(dom));
    }
};
export { serverListening };
