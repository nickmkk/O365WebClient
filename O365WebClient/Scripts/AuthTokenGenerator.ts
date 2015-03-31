class AuthTokenGenerator {
    private code: string;
    private token: AccessToken;

    constructor(code: string) {
        this.code = code;
    }

    private generateToken(tokenCallback: (token: string) => void) {
        //todo: figure out how to get the following from config
        var apiRootUrl = "http://localhost:23086";
        var clientId = "c8779caa-78e9-4039-ad69-ebb1a66324e1";
        var redirectUri = (<any>location).origin + "/account/mailboxlogin";
        var appSecret = "tPQf1p7TBHHXgl3EjRkIZduY85DleuBYT45qUDtdJsk=";
        var resource = "https://outlook.office365.com";

        jQuery.ajax({
            type: 'Post',
            url: apiRootUrl + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + clientId + "&redirect_uri=" + redirectUri + "&client_secret=" + appSecret + "&grant_type=authorization_code&code=" + this.code + "&resource=" + resource,

            xhrFields: {
                withCredentials: false
            },
            headers: {},

            success: (token: AccessToken, textStatus: string, jqXhr: JQueryXHR) => {
                this.token = token;
                tokenCallback(this.token.token_type + " " + this.token.access_token);
            },
            error: (jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => {
                debugger;
            }
        });
    }

    public getAccessToken(tokenCallback: (token: string) => void) {
        //todo: if the token is expired then get a new one
        if (typeof (this.token) != "undefined") {
            tokenCallback(this.token.token_type + " " + this.token.access_token);
            return;
        }
        this.generateToken(tokenCallback);
    }
}

class AccessToken {
    token_type: string;
    expires_in: string;
    expires_on: string;
    not_before: string;
    resource: string;
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    pwd_exp: string;
    pwd_url: string;
}