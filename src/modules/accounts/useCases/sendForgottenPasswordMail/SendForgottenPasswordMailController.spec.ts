import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgottenPasswordMailUseCase } from './SendForgottenPasswordMailUseCase';

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgotten Password Email', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		mailProvider = new MailProviderInMemory();

		sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider,
			mailProvider,
		);
	});

	it('Should be able to send a forgot password mail to user', async () => {
		const sendMail = jest.spyOn(mailProvider, 'sendMail');

		await usersRepositoryInMemory.create({
			driver_license: '993837',
			email: 'abeessar@hu.nc',
			name: 'Myrtie Brooks',
			password: 'LSKwIbrN',
		});

		await sendForgottenPasswordMailUseCase.execute('abeessar@hu.nc');

		expect(sendMail).toHaveBeenCalled();
	});

	it('Should not be able to send a email if the user does not exists', async () => {
		await expect(
			sendForgottenPasswordMailUseCase.execute('giprewwoz@ifi.fo'),
		).rejects.toEqual(new AppError('User not found.'));
	});

	it('Should be able to create a new refresh_token from user request', async () => {
		const tokenGeneration = jest.spyOn(
			usersTokensRepositoryInMemory,
			'create',
		);

		await usersRepositoryInMemory.create({
			driver_license: '375738',
			email: 'odifubik@damvos.bh',
			name: 'Catherine Yates',
			password: 'rjGoMXzs',
		});

		await sendForgottenPasswordMailUseCase.execute('odifubik@damvos.bh');

		expect(tokenGeneration).toHaveBeenCalled();
	});
});
