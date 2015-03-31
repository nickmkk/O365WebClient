using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace O365WebApi.Controllers
{
    [RoutePrefix("api/v1.0/me"), EnableCors("*", "*", "*")]
    public class MailController : ApiController
    {
        // GET api/v1.0/me/messages
        [Route("messages")]
        public async Task<MailboxContent> GetMessages()
        {
            var authToken = Request.Headers.GetValues("Authorization").First();
            MailboxContent content;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", authToken);
                var response = await client.GetAsync("https://outlook.office365.com/api/v1.0/me/messages");
                response.EnsureSuccessStatusCode();
                content = await response.Content.ReadAsAsync<MailboxContent>();
            }
            return content;
        }

        #region "Response Content" 
        
        public class Body
        {
            public string ContentType { get; set; }
            public string Content { get; set; }
        }

        public class EmailAddress
        {
            public string Address { get; set; }
            public string Name { get; set; }
        }

        public class Recipient
        {
            public EmailAddress EmailAddress { get; set; }
        }

        public class MailItem
        {
            public string Id { get; set; }
            public string ChangeKey { get; set; }
            public List<object> Categories { get; set; }
            public string DateTimeCreated { get; set; }
            public string DateTimeLastModified { get; set; }
            public string Subject { get; set; }
            public string BodyPreview { get; set; }
            public Body Body { get; set; }
            public string Importance { get; set; }
            public bool HasAttachments { get; set; }
            public string ParentFolderId { get; set; }
            public Recipient From { get; set; }
            public Recipient Sender { get; set; }
            public List<Recipient> ToRecipients { get; set; }
            public List<object> CcRecipients { get; set; }
            public List<object> BccRecipients { get; set; }
            public List<object> ReplyTo { get; set; }
            public string ConversationId { get; set; }
            public string DateTimeReceived { get; set; }
            public string DateTimeSent { get; set; }
            public bool? IsDeliveryReceiptRequested { get; set; }
            public bool IsReadReceiptRequested { get; set; }
            public bool IsDraft { get; set; }
            public bool IsRead { get; set; }
        }

        public class MailboxContent
        {
            public List<MailItem> value { get; set; }
        }

        #endregion

    }
}
