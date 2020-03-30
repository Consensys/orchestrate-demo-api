export const environment = {
    prod: false,
    basePath: 'api',
    port: 3000,
    orchestrate: {
        kafka: {
            endpoint: 'localhost:9092'
        },
        contractRegistry: {
            endpoint: 'localhost:8020'
        }
    }
};
