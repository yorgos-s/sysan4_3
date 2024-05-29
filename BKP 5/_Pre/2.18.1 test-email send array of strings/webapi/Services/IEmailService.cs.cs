namespace webapi.Services.cs
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string[]? body);

    }
}
