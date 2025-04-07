const errorHandlerMiddleware = (error, request, response, next) => {

    console.error('Errore gestito:', error.message);

    let statusCode = error.statusCode || 500;
    let message = error.message || 'Errore interno del server.';

    if (statusCode === 400 && !error.message) {
         message = "Richiesta non valida.";
    }
    if (statusCode === 401 && !error.message) {
        message = "Non autorizzato.";
    }
    if (statusCode === 404 && !error.message) {
        message = "Risorsa non trovata.";
    }
    /* if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors).map(val => val.message).join('. ');
    } */
    if (error.code === 11000) { // Duplicate key
        statusCode = 409; // Conflict
        const field = Object.keys(error.keyValue)[0];
        message = `Il valore fornito per il campo '${field}' esiste già.`;
    }
    if (error.name === 'CastError') {
        statusCode = 400;
        message = `Valore non valido per il campo ${error.path}: ${error.value}`;
    }

    response.status(statusCode).json({
         status: 'error',
         message: message,
    });
};

export default errorHandlerMiddleware