import { IsBoolean, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsBoolean()
	active: boolean;
}
