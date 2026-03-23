class AppError extends Error{
	constructor(message, statusCode){
		super(message);
		
		this.statusCode = statusCode;
		this.status = String(statusCode)[0] === "4" ? "Fail" : "Error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;