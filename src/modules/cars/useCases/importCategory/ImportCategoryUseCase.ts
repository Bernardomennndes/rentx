import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject('CategoriesRepostory')
		private categoriesRepository: CategoriesRepository,
	) {}

	async loadCategories(
		file: Express.Multer.File,
	): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on('data', async line => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on('end', async () => {
					await fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on('error', err => reject(err));

			// eslint-disable-next-line no-promise-executor-return
			return categories;
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories: IImportCategory[] = await this.loadCategories(file);

		categories.forEach(async category => {
			const { name, description } = category;

			const existsCategory = await this.categoriesRepository.findByName(
				name,
			);

			if (!existsCategory) {
				this.categoriesRepository.create({ name, description });
			}
		});
	}
}

export { ImportCategoryUseCase };
