export interface ILoginCredentials {
    email: string,
    password: string
}

export class LoginCredentials implements ILoginCredentials {
    email: string;
    password: string;

    constructor(props: ILoginCredentials) {
        this.email = props.email;
        this.password = props.password;
    }
}