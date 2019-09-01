import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';

import { commonMiddleware, signupMiddleware } from '../lib/middleware';
import SignUpDto from '../lib/dto/signup.dto';
import createUser from '../lib/cognito/createUser';

interface Context extends APIGatewayEventRequestContext {
    signUpDto: SignUpDto;
}

const signup = async (_event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        await createUser(context.signUpDto);
    } catch ({ statusCode, code, message}) {
        return {
            statusCode: statusCode,
            body: JSON.stringify({ code, message })
        };
    }

    return {
        statusCode: 201,
        body: JSON.stringify({}),
    };
};

export const handler = commonMiddleware(signup)
    .use(signupMiddleware());