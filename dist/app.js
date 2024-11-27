"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { httpMethod, body, pathParameters } = event;
        switch (httpMethod) {
            case 'POST': {
                const data = JSON.parse(body || '{}');
                // Handle POST logic...
                return {
                    statusCode: 201,
                    body: JSON.stringify({ message: 'Patient created successfully.' }),
                };
            }
            case 'GET': {
                const { id } = pathParameters || {};
                // Handle GET logic...
                return {
                    statusCode: 200,
                    body: JSON.stringify({ id }),
                };
            }
            default:
                return { statusCode: 405, body: 'Method Not Allowed' };
        }
    }
    catch (error) {
        // Use a type assertion to safely access the error message
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
});
exports.handler = handler;
