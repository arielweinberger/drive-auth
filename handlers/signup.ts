import 'source-map-support/register';

export const signup = async (_event, _context) => {
    console.log('aaa');
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Sign up' }),
    };
};