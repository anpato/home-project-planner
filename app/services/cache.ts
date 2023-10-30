import NodeCache from 'node-cache';

const cache = new NodeCache();
// TODO: Set up cachine
// cache = new Redis({ keyPrefix: 'context:', connectTimeout: 1000 });

// if (cache.status === 'close') {
//   cache =
// }

export { cache };
