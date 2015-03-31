var AuthTokenGenerator = (function () {
    function AuthTokenGenerator(code) {
        this.code = code;
    }
    AuthTokenGenerator.prototype.generateToken = function (tokenCallback) {
        var _this = this;
        //todo: figure out how to get the following from config
        var apiRootUrl = "http://localhost:23086";
        var clientId = "c8779caa-78e9-4039-ad69-ebb1a66324e1";
        var redirectUri = location.origin + "/account/mailboxlogin";
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
            success: function (token, textStatus, jqXhr) {
                _this.token = token;
                tokenCallback(_this.token.token_type + " " + _this.token.access_token);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                debugger;
            }
        });
    };
    AuthTokenGenerator.prototype.getAccessToken = function (tokenCallback) {
        //todo: if the token is expired then get a new one
        if (typeof (this.token) != "undefined") {
            tokenCallback(this.token.token_type + " " + this.token.access_token);
            return;
        }
        this.generateToken(tokenCallback);
    };
    return AuthTokenGenerator;
})();
var AccessToken = (function () {
    function AccessToken() {
    }
    return AccessToken;
})();
//# sourceMappingURL=AuthTokenGenerator.js.map