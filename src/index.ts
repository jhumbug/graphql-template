import { createApp } from './app';
import { PORT } from './config';

const server = createApp().listen(PORT, () => {
    console.log(`> Server listening on port ${PORT}`);
});

function shutdown(signal: NodeJS.Signals) {
    console.log(`> Got ${signal}. Graceful shutdown`);

    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('> Goodbye.');
        process.exit(0);
    });
}

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', shutdown);
// quit properly on docker stop
process.on('SIGTERM', shutdown);
