class AuthTokenGenerator {
    private authCode: string;
    private accessToken: AccessToken;

    //config
    private appSettings: AppSettings;
    private redirectUri: string;
    private resource: string;

    constructor(code: string) {
        this.authCode = code;
        
        this.appSettings = (<any>window).appSettings;
        this.redirectUri = (<any>location).origin + "/account/mailboxlogin";
        this.resource = "https://outlook.office365.com";
    }

    private generateToken(grantType: string, code: string, tokenCallback: (token: string) => void) {
        jQuery.ajax({
            type: 'Post',
            url: this.appSettings.accessTokenUri + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + this.appSettings.clientId +
            "&redirect_uri=" + this.redirectUri + "" +
            "&client_secret=" + this.appSettings.clientSecret+ "" +
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

class AppSettings {
    clientId: string;
    clientSecret: string;
    accessTokenUri: string;
}