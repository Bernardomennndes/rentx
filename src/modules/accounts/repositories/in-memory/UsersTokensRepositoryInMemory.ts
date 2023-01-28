import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
	usersTokens: UserTokens[];

	async create({
		user_id,
		expires_date,
		refresh_token,
	}: ICreateUserTokenDTO): Promise<UserTokens> {
		const userToken = new UserTokens();

		Object.assign(userToken, {
			user_id,
			expires_date,
			refresh_token,
		});

		this.usersTokens.push(userToken);

		return userToken;
	}

	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string,
	): Promise<UserTokens> {
		return this.usersTokens.find(
			token =>
				token.user_id === user_id &&
				token.refresh_token === refresh_token,
		);
	}

	async deleteById(id: string): Promise<void> {
		const index = this.usersTokens.findIndex(token => token.id === id);

		this.usersTokens.splice(index, 0);
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		return this.usersTokens.find(
			token => token.refresh_token === refresh_token,
		);
	}
}

export { UsersTokensRepositoryInMemory };
