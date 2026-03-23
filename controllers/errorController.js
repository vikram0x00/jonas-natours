export const errorHandler = (err, req, res, next)=>{
	// err - Better if it is an Error() constructor and throw
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "Error";

	if(process.env.NODE_ENV === "development"){
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
		else{
			console.log(err);
			res.status(500).json({
				status: "failed",
				message: "Something went very wrong"
			});
		}
	}
}