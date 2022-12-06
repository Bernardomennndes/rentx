import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { ListCategoriesController } from './ListCategoriesController';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  );
  return listCategoriesController;
};
