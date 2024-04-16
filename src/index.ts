import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai';

export interface Env {
	AI: any;
	[key: string]: any; // Add index signature for type 'string'
}

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const ai = new Ai(c.env.AI);

	const content = c.req.query("query") || 'Where pizza came from?';
	const messages = [
		{ role: 'system', content: 'You are a friendly assustant.' },
		{ role: 'user', content },
	];

	const inputs = { messages };

	const res = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', inputs);

	return c.json(res);
});

export default app;
