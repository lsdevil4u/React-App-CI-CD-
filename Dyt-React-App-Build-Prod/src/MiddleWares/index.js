import logger from './logger';

const getMiddlewares = () => {
    const middlewares = [];
    middlewares.push(logger);
    return middlewares;
}

export default getMiddlewares;