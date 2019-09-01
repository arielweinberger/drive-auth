import SignUpDto from "../dto/signUp.dto";

const signUpMiddleware = () => ({
    before: ({ event, context }, next) => {
        const { body } = event;

        const signUpDto: SignUpDto = {
            email: body.email,
            password: body.password,
            given_name: body.given_name,
            family_name: body.family_name,
            phone_number: body.phone_number
        };

        context.signUpDto = signUpDto;
        next();
    },
});

export default signUpMiddleware;