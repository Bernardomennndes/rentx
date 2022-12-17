import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token missing.', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'dada8dd8cf8a81db9786161269f642bc',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const userExists = usersRepository.findById(user_id);

    if (!userExists) throw new AppError('User does not exists.', 401);

    next();
  } catch {
    throw new AppError('Invalid Token.', 401);
  }
}
