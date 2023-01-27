import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
	const dayAdd24Hours = dayjs().add(1, 'day').toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		dayJsDateProvider = new DayjsDateProvider();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayJsDateProvider,
			carsRepositoryInMemory,
		);
	});

	it('Should be able to create a new rental', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Test',
			description: 'Car Test',
			daily_rate: 100,
			license_plate: 'Test',
			fine_amount: 40,
			category_id: '1235546',
			brand: 'Test',
		});

		const rental = await createRentalUseCase.execute({
			user_id: '12345',
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty('id');
		expect(rental).toHaveProperty('start_date');
	});

	it('Should not be able to create a new rental if there is another open rental related to the same user', async () => {
		await rentalsRepositoryInMemory.create({
			car_id: '12363',
			expected_return_date: dayAdd24Hours,
			user_id: 'test',
		});

		await expect(
			createRentalUseCase.execute({
				user_id: 'test',
				car_id: '12363456',
				expected_return_date: dayAdd24Hours,
			}),
		).rejects.toEqual(
			new AppError('There is already a proposed rental to this user.'),
		);
	});

	it('Should not be able to create a new rental if there is another open rental related to the same car', async () => {
		await rentalsRepositoryInMemory.create({
			car_id: 'test',
			expected_return_date: dayAdd24Hours,
			user_id: '12345',
		});

		await expect(
			createRentalUseCase.execute({
				user_id: '1234563',
				car_id: 'test',
				expected_return_date: dayAdd24Hours,
			}),
		).rejects.toEqual(
			new AppError('There is already a proposed rental to this user.'),
		);
	});

	it('Should not be able to create a new rental with return time less than 24 hours', async () => {
		await expect(
			createRentalUseCase.execute({
				user_id: '12347',
				car_id: '12323',
				expected_return_date: dayjs().toDate(),
			}),
		).rejects.toEqual(new AppError('Invalid return time.'));
	});
});
