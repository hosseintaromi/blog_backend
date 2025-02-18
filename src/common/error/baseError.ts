export class BaseError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends BaseError {
	constructor(property: string = 'requested detail') {
		super(`${property} not found`, 404);
	}
}

export class UnauthorizedError extends BaseError {
	constructor(property: string = 'UnauthorizedError') {
		super(`${property} is not authorized`, 401);
	}
}

export class ExistedError extends BaseError {
	constructor(property: string = 'requested detail') {
		super(`${property} is already used`, 400);
	}
}

export class BadRequestError extends BaseError {
	constructor(message: string = 'Bad Request') {
		super(message, 400);
	}
}

export class ForbiddenError extends BaseError {
	constructor(message: string = 'Forbidden') {
		super(message, 403);
	}
}
