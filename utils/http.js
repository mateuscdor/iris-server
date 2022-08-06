/**
 * Sends `msg` as response with specified status code
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {object} result
 */
export function sendResponse(res, statusCode, message, result = {}) {
   res.status(statusCode).json({
      statusCode,
      message,
      result,
   });
}

/**
 * Sends `msg` as response with 200 status code
 * @param {import('express').Response} res
 * @param {string} message
 * @param {object} result
 */
export function send200Response(res, message, result = {}) {
   send200Response(res, 200, message, result);
}
