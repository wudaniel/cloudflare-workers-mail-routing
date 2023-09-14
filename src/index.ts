import handleEmail from './mail';
import handleAPI from './api';

export default {
	async email(message: ForwardableEmailMessage, env: Env, ctx: object) {
		handleEmail.email(message, env, ctx);
	},

	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return handleAPI.handle(request, env, ctx);
	}
}