export enum AuthType {
    HttpBasicAuth,
}

export interface Auth {
    readonly type: AuthType;
    authorize(req: Request): Promise<void>;
    check(req: Request): boolean;
}

export class HttpBasicAuth implements Auth {
    private readonly username: string;
    private readonly password: string;
    public readonly type: AuthType = AuthType.HttpBasicAuth;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    encode(): string {
        return (
            "Basic " +
            Buffer.from(`${this.username}:${this.password}`).toString("base64")
        );
    }

    async authorize(req: Request): Promise<void> {
        req.headers.set("Authorization", this.encode());
    }

    check(req: Request): boolean {
        return req.headers.get("Authorization") == this.encode();
    }
}
