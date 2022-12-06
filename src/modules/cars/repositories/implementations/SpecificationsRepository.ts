import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  // private static INSTANCE: SpecificationRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // public static getInstance(): SpecificationRepository {
  //   if (!SpecificationRepository.INSTANCE) {
  //     SpecificationRepository.INSTANCE = new SpecificationRepository();
  //   }

  //   return SpecificationRepository.INSTANCE;
  // }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = this.repository.create({
      name,
      description,
    });

    this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationRepository };
