import { Router } from 'express';
import { UniversityController } from './university.controller.js';
import { body, param } from 'express-validator';
const universityRouter = new Router();

const universityController = new UniversityController();

universityRouter.post(
	'/',
	[body('name').notEmpty().withMessage('Введите название').trim().escape()],
	universityController.createUniversity
);

universityRouter.get(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	universityController.getUniversityById
);

universityRouter.get('/', universityController.getAllUniversities);

universityRouter.put(
	'/:id',
	[
		param('id').custom((value) => uuidv4.validate(value)),
		body('name').notEmpty().withMessage('Введите имя').trim().escape(),
	],
	universityController.updateUniversityById
);

universityRouter.delete(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	universityController.deleteUniversityById
);

export default universityRouter;
