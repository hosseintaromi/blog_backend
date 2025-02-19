import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsNumber()
	userId: number;

	@IsBoolean()
	active: boolean;
}
