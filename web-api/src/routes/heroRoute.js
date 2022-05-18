import { once } from 'node:events'
import Hero from '../entities/hero.js';
import { DEFAULT_HEADERS } from '../util/util.js';

const routes = ({
  heroService,
}) => ({
  '/heroes:get': async (request, response) => {
    const heroes = await heroService.find();

    response.writeHead(201, DEFAULT_HEADERS);
    response.write(JSON.stringify({ results: heroes}));
    
    return response.end()
  },
  
  '/heroes:post': async (request, response) => {
    const data = await once(request, 'data');
    const item = JSON.parse(data);
    const hero = new Hero(item);

    const id = await heroService.create(hero);
    
    response.writeHead(201, DEFAULT_HEADERS);
    response.write(JSON.stringify({
      id,
      success: 'Hero created successfully!',
    }));

    return response.end()
  },
}) 

export {
  routes,
}