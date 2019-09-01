import SignInDto from "../dto/signIn.dto";

const signInMiddleware = () => ({
    before: ({ event, context }, next) => {
        const { body } = event;

        const signInDto: SignInDto = {
            email: body.email,
            password: body.password,
        };

        context.signInDto = signInDto;
        next();
    },
});

export default signInMiddleware;