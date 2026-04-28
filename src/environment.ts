const protocol = process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_STRAPI_PORT;
const apiBackend = process.env.API_BACKEND || 'http://localhost:3000';

const environment = {
  strapi: {
    apiEndpoint: port ? `${protocol}://${host}:${port}` : `${protocol}://${host}`,
  },
  apiBackend,
};

export default environment;
