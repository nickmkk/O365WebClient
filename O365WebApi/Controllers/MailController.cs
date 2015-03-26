using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace O365WebApi.Controllers
{
	public class MailController : ApiController
	{
		// GET: Mail
		public Object Messages()
		{
			var authToken = Request.Headers.GetValues("Authorization").First();

			using (var client = new HttpClient())
			{
				client.DefaultRequestHeaders.Add("Authorization", authToken);
				var response = client.GetAsync("https://outlook.office365.com/api/v1.0/me/messages").Result;
				response.EnsureSuccessStatusCode();
				return response;
			}
		}
	}
}