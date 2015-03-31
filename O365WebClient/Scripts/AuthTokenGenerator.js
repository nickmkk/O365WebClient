var AuthTokenGenerator = (function () {
    function AuthTokenGenerator(code) {
        this.authCode = code;
        //todo: figure out how to get the following from config
        this.apiRootUrl = "http://localhost:23086";
        this.clientId = "c8779caa-78e9-4039-ad69-ebb1a66324e1";
        this.redirectUri = location.origin + "/account/mailboxlogin";
        this.appSecret = "tPQf1p7TBHHXgl3EjRkIZduY85DleuBYT45qUDtdJsk=";
        this.resource = "https://outlook.office365.com";
    }
    AuthTokenGenerator.prototype.generateToken = function (grantType, code, tokenCallback) {
        var _this = this;
        jQuery.ajax({
            type: 'Post',
            url: this.apiRootUrl + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + this.clientId + "&redirect_uri=" + this.redirectUri + "" + "&client_secret=" + this.appSecret + "" + "&grant_type=" + grantType + "&code=" + code + "&resource=" + this.resource,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (accessToken, textStatus, jqXhr) {
                _this.accessToken = accessToken;
                tokenCallback(_this.accessToken.token_type + " " + _this.accessToken.access_token);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                debugger;
            }
        });
    };
    AuthTokenGenerator.prototype.getAccessToken = function (tokenCallback) {
        if (typeof (this.accessToken) == "undefined") {
            this.generateToken("authorization_code", this.authCode, tokenCallback);
            return;
        }
        var tokenExpires = new Date(this.accessToken.expires_on * 1000);
        var expired = new Date() > tokenExpires;
        debugger;
        if (expired) {
            this.generateToken("refresh_token", this.accessToken.refresh_token, tokenCallback);
        }
        else {
            tokenCallback(this.accessToken.token_type + " " + this.accessToken.access_token);
        }
    };
    return AuthTokenGenerator;
})();
var AccessToken = (function () {
    function AccessToken() {
    }
    return AccessToken;
})();
//# sourceMappingURL=AuthTokenGenerator.js.map