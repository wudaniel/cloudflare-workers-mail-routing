import { Router } from 'itty-router';
import { Utils } from './utils';

// now let's create a router (note the lack of "new")
const router = Router();

router.all('*',Utils.withAuthenticatedUser);

// GET item
router.get('/api/mail/:domain',async ({ params },env:Env) => {
    let stmt = env.mailAddr.prepare(`SELECT user.name AS user, user.tag AS tag, dest_addresses.email AS dest_email
    FROM user
    JOIN domain ON user.domain_id = domain.id
    JOIN dest_addresses ON user.dest_id = dest_addresses.id
    WHERE domain.name = ?1
    `)
    let { results } = await stmt.bind(params.domain).all();
    return Response.json(results);
});

// POST to the collection (we'll use async here)
router.post('/api/mail/:domain', async (request, env:Env) => {

    return new Response('Creating Todo: ' + JSON.stringify([]));
});

router.put('/api/mail/:domain', async (request,env:Env) => {

});

router.delete('/api/mail/:domain', async (request,env:Env)=> {

});
// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
