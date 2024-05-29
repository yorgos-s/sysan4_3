using MimeKit;

namespace webapi.Services.cs
{
    public interface IEmailService
    {
        void SendEmail(MimeMessage message);
    }
}