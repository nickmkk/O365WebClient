using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(O365WebClient.Startup))]
namespace O365WebClient
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
