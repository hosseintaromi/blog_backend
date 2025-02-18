import { AppDataSource } from '../..';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository {
	async findByEmail(email: string): Promise<User | null> {
		return await AppDataSource.manager.findOneBy(User, { email });
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const newUser = AppDataSource.manager.create(User, createUserDto);
		return await AppDataSource.manager.save(newUser);
	}
}
