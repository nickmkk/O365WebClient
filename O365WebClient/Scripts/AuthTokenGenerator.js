var AuthTokenGenerator = (function () {
    function AuthTokenGenerator(code) {
        this.authCode = code;
        this.appSettings = window.appSettings;
        this.redirectUri = location.origin + "/account/mailboxlogin";
        this.resource = "https://outlook.office365.com";
    }
    AuthTokenGenerator.prototype.generateToken = function (grantType, code, tokenCallback) {
        var _this = this;
        jQuery.ajax({
            type: 'Post',
            url: this.appSettings.accessTokenUri + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + this.appSettings.clientId + "&redirect_uri=" + this.redirectUri + "" + "&client_secret=" + this.appSettings.clientSecret + "" + "&grant_type=" + grantType + "&code=" + code + "&resource=" + this.resource,
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
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
})();
//# sourceMappingURL=AuthTokenGenerator.js.map