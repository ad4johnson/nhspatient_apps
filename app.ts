import { APIGatewayProxyHandler } from "aws-lambda/trigger/api-gateway-proxy";

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log('Received event:', JSON.stringify(event));
    try {
        const { httpMethod, body } = event;

        switch (httpMethod) {
            case 'POST': {
                const data = JSON.parse(body || '{}');
                console.log('Parsed data:', data);
                // Ensure required fields are present
                if (!data.name || !data.age || !data.condition) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ message: 'Missing required fields' }),
                    };
                }
                // DynamoDB logic...
            }
            default:
                return { statusCode: 405, body: 'Method Not Allowed' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: (error as Error).message }) };
    }
};
