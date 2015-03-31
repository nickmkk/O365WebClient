var AuthTokenGenerator = (function () {
    function AuthTokenGenerator(code) {
        this.code = code;
        //todo: figure out how to get the following from config
        var rootUrl = "https://login.windows.net";
        var clientId = "c8779caa-78e9-4039-ad69-ebb1a66324e1";
        var appSecret = "tPQf1p7TBHHXgl3EjRkIZduY85DleuBYT45qUDtdJsk=";
        var resource = "https://outlook.office365.com";
        jQuery.ajax({
            type: 'Post',
            url: rootUrl + "/common/oauth2/token",
            contentType: "application/x-www-form-urlencoded",
            data: "client_id=" + clientId + "&client_secret=" + appSecret + "&grant_type=authorization_code&code=" + code + "&resource=" + resource,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (data, textStatus, jqXhr) {
                debugger;
            },
            error: function (jqXhr, textStatus, errorThrown) {
                debugger;
            }
        });
    }
    AuthTokenGenerator.prototype.getAccessToken = function () {
    };
    return AuthTokenGenerator;
})();
//# sourceMappingURL=AuthToken.js.map