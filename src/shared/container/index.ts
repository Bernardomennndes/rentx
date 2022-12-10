import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
