import AWS from 'aws-sdk';
import { AdminCreateUserRequest, AdminSetUserPasswordRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import SignUpDto from '../dto/signUp.dto';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
const UserPoolId = process.env.COGNITO_POOL_ID!;

export default async function createUser(userDetails: SignUpDto) {
    const { User } = await cognito.adminCreateUser({
        UserPoolId, 
        Username: userDetails.email,
        UserAttributes: [
            { Name: 'given_name', Value: userDetails.given_name },
            { Name: 'family_name', Value: userDetails.family_name },
            { Name: 'phone_number', Value: userDetails.phone_number },
        ],
        MessageAction: 'SUPPRESS',
        DesiredDeliveryMediums: ['EMAIL'],
    }).promise();

    await cognito.adminSetUserPassword({
        UserPoolId,
        Username: User!.Username!,
        Password: userDetails.password,
        Permanent: true,
    }).promise();

    return User;
}