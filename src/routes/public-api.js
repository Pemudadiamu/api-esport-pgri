import express from 'express'
import userController from '../controller/user-controller.js'
import settingController from '../controller/setting-controller.js';

const publicRouter = express.Router();

// publicRouter.post('/api/users/register' , userController.register);

publicRouter.post('/api/users/register' , userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/settings', settingController.getSettings);

export{
    publicRouter
}