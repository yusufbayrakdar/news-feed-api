import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse;
    if (exception.getResponse) {
      const response = exception.getResponse();
      errorResponse =
        typeof response === "object" && !Array.isArray(response)
          ? exception.getResponse()
          : {
              statusCode: status,
              error: "",
              message: Array.isArray(response)
                ? response
                : [
                    status !== HttpStatus.INTERNAL_SERVER_ERROR
                      ? response || exception.message || null
                      : "Internal server error"
                  ]
            };
    } else {
      errorResponse = exception;
    }
    console.error(errorResponse);

    response.status(status).json(errorResponse);
  }
}
