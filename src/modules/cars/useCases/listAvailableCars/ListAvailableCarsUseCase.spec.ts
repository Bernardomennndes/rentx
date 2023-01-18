import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('List Cars', () => {
	beforeEach(() => {
		carsRepository = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
	});

	it('Should be able to list all avaible cars', async () => {
		const car1 = await carsRepository.create({
			name: 'Car 1',
			description: 'Listing test',
			daily_rate: 100,
			license_plate: 'DEF-1234',
			fine_amount: 40,
			brand: 'Test',
			category_id: null,
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([car1]);
	});

	it('Should be able to list all available cars by name', async () => {
		const car2 = await carsRepository.create({
			name: 'Car 2',
			description: 'Listing test',
			daily_rate: 100,
			license_plate: 'DEF-1235',
			fine_amount: 40,
			brand: 'Test',
			category_id: null,
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: 'Car 2',
		});

		expect(cars).toEqual([car2]);
	});

	it('Should be able to list all available cars by brand', async () => {
		const car2 = await carsRepository.create({
			name: 'Car 2',
			description: 'Listing test',
			daily_rate: 100,
			license_plate: 'DEF-1237',
			fine_amount: 40,
			brand: 'Test',
			category_id: null,
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: 'Test',
		});

		expect(cars).toEqual([car2]);
	});

	it('Should be able to list all available cars by category', async () => {
		const car2 = await carsRepository.create({
			name: 'Car 2',
			description: 'Listing test',
			daily_rate: 100,
			license_plate: 'DEF-1237',
			fine_amount: 40,
			brand: 'Test',
			category_id: '123',
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: '123',
		});

		expect(cars).toEqual([car2]);
	});
});
