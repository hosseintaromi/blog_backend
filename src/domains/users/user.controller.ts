import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

const userService = new UserService();

export const registerHandler = async (req: Request, res: Response) => {
	const createUserDto: CreateUserDto = req.body;
	try {
		const user = await userService.createUser(createUserDto);
		res.status(201).send(user);
	} catch (error: any) {
		res.status(400).send({ message: error.message });
	}
};

export const loginHandler = async (req: Request, res: Response) => {
	const loginUserDto: LoginUserDto = req.body;
	try {
		const { user, token } = await userService.loginUser(loginUserDto);
		res.status(200).json({ user, token });
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const forgetPasswordHandler = async (req: Request, res: Response) => {
	const { email } = req.body;
	try {
		const message = await userService.forgetPassword(email);
		res.status(200).send(message);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const getUserListHandler = async (req: Request, res: Response) => {
	try {
		const users = await userService.getUserList();
		res.status(200).send(users);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const getUserInfoHandler = async (req: Request, res: Response) => {
	const { userId } = req.params;
	try {
		const user = await userService.getUserInfo(Number(userId));
		res.status(200).send(user);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};
