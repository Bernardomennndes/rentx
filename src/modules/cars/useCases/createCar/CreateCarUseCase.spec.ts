import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';
import { AppError } from '@shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Test Car',
      description: 'Test Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Test Error',
        description: 'Test Description',
        daily_rate: 100,
        license_plate: 'ABC-000',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Test Erorr',
        description: 'Test Description',
        daily_rate: 100,
        license_plate: 'ABC-000',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new car with available field as true', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Test Description',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
