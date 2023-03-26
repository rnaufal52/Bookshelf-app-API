const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        // Menambahkan cors
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // Route
    server.route(routes);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
