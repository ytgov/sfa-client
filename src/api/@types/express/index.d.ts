namespace Express {
    export interface Request {
        user?: any;
        oidc?: any;
        sessionId?: string;

        isAuthenticated(): boolean;
    }
}