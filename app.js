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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { httpMethod, body, pathParameters } = event;
        switch (httpMethod) {
            case 'POST': {
                const data = JSON.parse(body || '{}');
                const params = {
                    TableName: 'Patients',
                    Item: Object.assign(Object.assign({}, data), { id: Date.now().toString() }),
                };
                yield dynamoDb.put(params).promise();
                return {
                    statusCode: 201,
                    body: JSON.stringify({ message: 'Patient created successfully.' }),
                };
            }
            case 'GET': {
                const { id } = pathParameters || {};
                if (id) {
                    const params = {
                        TableName: 'Patients',
                        Key: { id },
                    };
                    const result = yield dynamoDb.get(params).promise();
                    return {
                        statusCode: 200,
                        body: JSON.stringify(result.Item),
                    };
                }
                const params = { TableName: 'Patients' };
                const result = yield dynamoDb.scan(params).promise();
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.Items),
                };
            }
            default:
                return { statusCode: 405, body: 'Method Not Allowed' };
        }
    }
    catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
});
exports.handler = handler;
