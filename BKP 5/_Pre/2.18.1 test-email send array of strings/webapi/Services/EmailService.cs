﻿using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using webapi.Services.cs;

namespace webapi.Services
{
    public class EmailService : IEmailService
    {
        public void SendEmail(string to, string subject, string[] body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Geo Stef", "geo_stef@hotmail.com"));
            message.To.Add(new MailboxAddress("", to));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = string.Join(Environment.NewLine, body)
                //Text = body
            };

            // SMTP server configuration - replace with your SMTP details
            string smtpServer = "smtp-mail.outlook.com"; // For Hotmail/Outlook
            int smtpPort = 587; // Common port for SMTP
            string smtpUser = "geo_stef@hotmail.com";
            string smtpPassword = "0okmnji9"; // Replace with your password

            using (var client = new SmtpClient())
            {
                client.Connect(smtpServer, smtpPort, SecureSocketOptions.StartTls);
                client.Authenticate(smtpUser, smtpPassword);

                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
