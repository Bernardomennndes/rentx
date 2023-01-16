import multer from 'multer';
import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createUserController.handle,
);

usersRoutes.patch(
	'/avatar',
	ensureAuthenticated,
	uploadAvatar.single('avatar'),
	updateUserAvatarController.handle,
);

export { usersRoutes };
