namespace Express {
    export interface Request {
        user?: any;
        oidc?: any;
        sessionId?: string;
        format?: string; // e.g. pdf, html, .csv, etc.

        isAuthenticated(): boolean;
    }
}