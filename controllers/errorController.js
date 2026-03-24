export const errorHandler = (err, req, res, next)=>{
	// err - Better if it is an Error() constructor and throw
	// I do not prefer to modulify literally everything. Half Clean Code IS okay

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "Error";
	if(process.env.NODE_ENV === "development"){
		// REMOVE THIS LINE
		console.log(err);
		// Handle Cast Error
		if(err.name === "CastError"){
			const errorObject = {
				name: "CastError",
				message: "CastError for the input field",
				expected: err.kind,
				sent: err.value,
				stack: err.stack,
				invalidField: err.path
			}
			return res.status(500).json(Object.assign({
				status: "failed"
			}, errorObject));
		}
		// Handle Duplicate Fields
		// Handling only name here because name is the only unique field in the entire schema so far
		if(err.errorResponse){
			if(err.errorResponse.code === 11000){
				const errorObject = {
					name: "DuplicateKeyError",
					message: "Duplicate Values entered for a unique field defined in the Schema",
					errmsg: err.errorResponse.errmsg,
					duplicateField: Object.keys(err.keyValue)[0],
					duplicateValue: Object.values(err.keyValue)[0],
					stack: err.stack
				}
				return res.status(400).json(Object.assign({ status: "failed" }, errorObject));
			}
		}
		// Common Dev Error Response 
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			stack: err.stack,
			error: err
		});
	}
	else if (process.env.NODE_ENV === "production") {
		if(err.isOperational){
			res.status(err.statusCode).json({
				status: err.status,
				message: err.message
			});
		}
		// Handle Cast Error
		else if(err.name === "CastError"){
			return res.status(500).json({
				status: "failed",
				message: `Invalid Data Entered for ${err.path}: ${err.value}`
			});
		}
		// Handle Duplicate Tour Name
		if(err.errorResponse.code === 11000){
			const errorObject = {
				duplicateField: Object.keys(err.keyValue)[0],
				duplicateValue: Object.values(err.keyValue)[0]
			}
			return res.status(400).json({
				status: "failed",
				message: `Duplicate Value entered for ${errorObject.duplicateField}: ${errorObject.duplicateValue}`
			});
		}
		else{
			console.log(err);
			res.status(500).json({
				status: "failed",
				message: "Something went very wrong"
			});
		}
	}
}