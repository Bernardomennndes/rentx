import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepostitoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
	beforeEach(() => {
		carsRepostitoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory =
			new SpecificationsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepostitoryInMemory,
			specificationsRepositoryInMemory,
		);
	});

	it('Should not be able to add a new specification to a non existing car', () => {
		expect(async () => {
			const car_id = '123';
			const specifications_id = ['345'];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('Should be able to add a new specification to a car', async () => {
		const car = await carsRepostitoryInMemory.create({
			name: 'Test Car',
			description: 'Test Description',
			daily_rate: 100,
			license_plate: 'ABC-1234',
			fine_amount: 60,
			brand: 'Test Brand',
			category_id: 'category',
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: 'Test Specification',
			description: 'Test Description',
		});

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id: [specification.id],
		});

		expect(specificationsCars).toHaveProperty('specifications');
		expect(specificationsCars.specifications.length).toBe(1);
	});
});
