using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace O365WebApi.Controllers
{
    [RoutePrefix("common/oauth2"), EnableCors("*", "*", "*")]
    public class AuthorizationController : ApiController
    {
        // Post common/oauth2/token
        [Route("token")]
        public async Task<AccessToken> Token()
        {
            var queryString = await Request.Content.ReadAsStringAsync();
            var parsedQueryString = HttpUtility.ParseQueryString(queryString);
            var requestContent = parsedQueryString.AllKeys.ToDictionary(key => key, key => parsedQueryString[key]);

            AccessToken token;
            using (var client = new HttpClient())
            {
                var content = new FormUrlEncodedContent(requestContent);
                var response = await client.PostAsync("https://login.windows.net/common/oauth2/token", content);
                response.EnsureSuccessStatusCode();
                token = await response.Content.ReadAsAsync<AccessToken>();
            }
            return token;
        }
    }

    public class AccessToken
    {
        public string token_type { get; set; }
        public string expires_in { get; set; }
        public string expires_on { get; set; }
        public string not_before { get; set; }
        public string resource { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public string scope { get; set; }
        public string id_token { get; set; }
        public string pwd_exp { get; set; }
        public string pwd_url { get; set; }
    }
}
