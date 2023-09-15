import { setupServer } from 'msw/node';
import { handlers } from './handlers';

//Configure a service worker with the given request handlers
console.log('server up');
export const server = setupServer(...handlers);
