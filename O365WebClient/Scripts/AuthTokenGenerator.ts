class AuthTokenGenerator {
    private authCode: string;
    private accessToken: AccessToken;

    //config
    private apiRootUrl: string;
    private clientId: string;
    private redirectUri: string;
    private appSecret: string;
    private resource: string;

    constructor(code: string) {
        this.authCode = code;
        //todo: figure out how to get the following from config
        this.apiRootUrl = "http://localhost:23086";
        this.clientId = "c8779caa-78e9-4039-ad69-ebb1a66324e1";
        this.redirectUri = (<any>location).origin + "/account/mailboxlogin";
        this.appSecret = "tPQf1p7TBHHXgl3EjRkIZduY85DleuBYT45qUDtdJsk=";
        this.resource = "https://outlook.office365.com";
    }

    private generateToken(grantType: string, code: string, tokenCallback: (token: string) => void) {
        jQuery.ajax({
            type: 'Post',
            url: this.apiRootUrl + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + this.clientId +
            "&redirect_uri=" + this.redirectUri + "" +
            "&client_secret=" + this.appSecret + "" +
            "&grant_type=" + grantType +
            "&code=" + code +
            "&resource=" + this.resource,

            xhrFields: {
                withCredentials: false
            },
            headers: {},

            success: (accessToken: AccessToken, textStatus: string, jqXhr: JQueryXHR) => {
                this.accessToken = accessToken;
                tokenCallback(this.accessToken.token_type + " " + this.accessToken.access_token);
            },
            error: (jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => {
                debugger;
            }
        });
    }

    public getAccessToken(tokenCallback: (token: string) => void) {
        if (typeof (this.accessToken) == "undefined") {
            this.generateToken("authorization_code", this.authCode, tokenCallback);
            return;
        }
        var tokenExpires = new Date(this.accessToken.expires_on * 1000);
        var expired = new Date() > tokenExpires;
        debugger;
        if (expired) {
            this.generateToken("refresh_token", this.accessToken.refresh_token, tokenCallback);
        } else {
            tokenCallback(this.accessToken.token_type + " " + this.accessToken.access_token);
        }
    }

}

class AccessToken {
    token_type: string;
    expires_in: number;
    expires_on: number;
    not_before: number;
    resource: string;
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    pwd_exp: number;
    pwd_url: string;
}