import { IsBoolean, IsString } from 'class-validator';

export class UpdatePostDto {
	@IsString()
	title?: string;

	@IsString()
	description?: string;

	@IsBoolean()
	active?: boolean;
}
