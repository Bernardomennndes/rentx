import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[];

	constructor() {
		this.cars = [];
	}

	async create({
		id,
		name,
		description,
		brand,
		category_id,
		daily_rate,
		fine_amount,
		license_plate,
	}: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			id,
			name,
			description,
			brand,
			category_id,
			daily_rate,
			fine_amount,
			license_plate,
		});

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return this.cars.find(car => car.license_plate === license_plate);
	}

	async findAvailable(
		brand?: string,
		name?: string,
		category_id?: string,
	): Promise<Car[]> {
		const cars = this.cars.filter(car => {
			if (
				car.available ||
				(brand && car.brand === brand) ||
				(category_id && car.category_id === category_id) ||
				(name && car.name === name)
			)
				return car;
			return null;
		});
		return cars;
	}

	async findById(id: string): Promise<Car> {
		return this.cars.find(car => car.id === id);
	}
}

export { CarsRepositoryInMemory };
