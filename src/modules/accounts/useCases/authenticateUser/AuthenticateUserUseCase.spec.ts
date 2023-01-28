import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider,
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it('Should be able to authenticate an user', async () => {
		const user: ICreateUserDTO = {
			driver_license: '0001556',
			username: 'defaultUsername',
			email: 'user@test.com',
			password: '1234',
			name: 'Test User',
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty('token');
	});

	it('Shoul not be able to authenticate a non existing user', async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: 'false@email.com',
				password: '123',
			}),
		).rejects.toEqual(new AppError('Email or password incorrect.'));
	});

	it('Should not be able to authenticate with incorrect password', async () => {
		const user: ICreateUserDTO = {
			driver_license: '23523450',
			username: 'defaultUsername2',
			email: 'usererror@test.com',
			password: '1234',
			name: 'Test User Error',
		};

		await createUserUseCase.execute(user);

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: 'incorrectPassword',
			}),
		).rejects.toEqual(new AppError('Email or password incorrect.'));
	});
});
