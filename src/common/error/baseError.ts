export class BaseError {
	message: string;
	status: number;

	constructor(message: string, status: number) {
		this.message = message;
		this.status = status;
	}
}

export class NotFoundError extends BaseError {
	constructor(property: string | undefined = 'requested detail') {
		super(`${property} not found`, 404);
	}
}

export class ExistedError extends BaseError {
	constructor(property: string | undefined = 'requested detail') {
		super(`${property} is already used`, 400);
	}
}
