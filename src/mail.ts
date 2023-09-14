import { Utils } from './utils';
import { Env } from '.';

export default {
    async email(message: ForwardableEmailMessage, env: Env, ctx: object) {
        if (Utils.countPlusSigns(message.to) > 1) {
            message.setReject("Address not allowed");
        }
        let destAddress = Utils.mailParser(message.to);
        if (destAddress === null) {
            message.setReject("Address not allowed");
        }
        let stmt = env.mailAddr.prepare(`SELECT dest_addresses.email
		FROM dest_addresses
		JOIN user ON dest_addresses.id = user.dest_id
		JOIN domain ON user.domain_id = domain.id
		WHERE domain.name = ?3 AND user.name = ?1 AND (user.tag = ?2 OR user.tag = '*')`);
        let { results } = await stmt.bind(destAddress?.username, destAddress?.tag || '', destAddress?.domain).all();
        if (results.length === 0) {
            message.setReject("Address not allowed");
        }
        for (let result of results) {
            // console.log('dest', String(result.email));
            await message.forward(String(result.email));
            // console.log(`complete email to ${String(result.email)}`);
        }

    }
}