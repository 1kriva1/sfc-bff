import { IdentityPrompt } from "./identity-prompt.enum";
import { Session } from "./session.type";

export class IdentityConstants {
    static IDENTITY_URL: string = '/bff/login';
    static IDENTITY_USER_URL: string = '/bff/user';
    static PROMPT_KEY: string = 'prompt';
    static LOGOUT_URL_CLAIM_NAME: string = 'bff:logout_url';
    static USERNAME_CLAIM_NAME: string = 'name';
    static LOGIN_URL: string = `${this.IDENTITY_URL}?${this.PROMPT_KEY}=${IdentityPrompt.Login}`;
    static REGISTRATION_URL: string = `${this.IDENTITY_URL}?${this.PROMPT_KEY}=${IdentityPrompt.Registration}`;
    static ANONYMOUS: Session = null;
    static CACHE_SIZE = 1;
}