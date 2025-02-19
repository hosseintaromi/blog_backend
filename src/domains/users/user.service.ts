import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { BadRequestError, ExistedError, NotFoundError } from '../../common/error/baseError';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { AppDataSource } from '../../config/orm';

const userRepo = new UserRepository();

export class UserService {
	private generateToken(user: User) {
		const payload = {
			id: user.id,
			email: user.email
		};
		const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
		return jwt.sign(payload, secretKey, { expiresIn: '1h' });
	}

	async createUser(createUserDto: CreateUserDto) {
		if (!passwordRegex.test(createUserDto.password)) throw new BadRequestError('Password is not valid.');

		if (!emailRegex.test(createUserDto.email)) throw new BadRequestError('Email is not valid.');

		const existingUser = await userRepo.findByEmail(createUserDto.email);

		if (existingUser) throw new ExistedError(createUserDto.email);

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		createUserDto.password = hashedPassword;

		return await userRepo.create(createUserDto);
	}

	async loginUser(loginUserDto: LoginUserDto) {
		const user = await userRepo.findByEmail(loginUserDto.email);
		if (!user) throw new Error('User not found');

		const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
		if (!isPasswordValid) throw new Error('Invalid password');

		const token = this.generateToken(user);
		return { user, token };
	}

	// FIXME: fix me any type
	async getUserInfo(userId: any) {
		const user = await userRepo.findByEmail(userId);
		if (!user) throw new Error('User not found');
		return user;
	}

	async forgetPassword(email: string) {
		const user = await userRepo.findByEmail(email);
		if (!user) throw new Error('User not found');
		return 'Password reset link has been sent';
	}

	async getUserList() {
		return await AppDataSource.manager.find(User);
	}
}
