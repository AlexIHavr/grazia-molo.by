import nodemailer, { Transporter } from 'nodemailer';
import config from 'config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { onlineMailRequestType } from '../types/servicesTypes';

class MailService {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: config.get('SMTP_HOST'),
        port: config.get('SMTP_PORT'),
        secure: true,
        auth: {
          user: config.get('SMTP_USER'),
          pass: config.get('SMTP_PASSWORD'),
        },
      },
      {
        from: config.get('SMTP_USER'),
      }
    );
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      to,
      subject: 'Активация аккаунта на ' + config.get('API_URL'),
      html: `
        <style>
          div {
            font-family: 'helvetica', 'arial', sans-serif;
            background-color: #d5edff;
            color: #072f56;
            padding: 20px;
            border: 2px solid #072f56;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 10px;
          }
          h1,
          h3,
          h4 {
            text-align: center;
            padding: 10px;
            width: 50%;
            margin: 0 auto;
            border: 2px solid #072f56;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 10px;
          }
          h3 {
            margin: 10px auto;
            width: fit-content;
            border: none;
          }
          h4 {
            width: fit-content;
            border: none;
          }
        </style>
        <div>
          <h1>Активация аккаунта ${to}</h1>
          <h3>Для активации аккаунта перейдите по ссылке:</h3>
          <h4>
            <a href=${link}>${link}</a>
          </h4>
        </div>
      `,
    });
  }

  async sendOnlineMail({ name, phone, age }: onlineMailRequestType) {
    await this.transporter.sendMail({
      to: config.get('SMTP_USER'),
      subject: 'Запись на занятие',
      html: `
        <style>
          div {
            font-family: 'helvetica', 'arial', sans-serif;
            background-color: #d5edff;
            color: #072f56;
            padding: 20px;
            border: 2px solid #072f56;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 10px;
          }
          h1 {
            text-align: center;
            padding: 10px;
            width: 50%;
            margin: 0 auto;
            border: 2px solid #072f56;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 10px;
          }
          table {
            margin: 0 auto;
            width: 50%;
            text-align: center;
            font-size: 20px;
            border-spacing: 20px;
          }
          td {
            padding: 5px 10px;
            border-bottom: 2px solid #000597;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
          }
        </style>
        <div>
          <h1>Заявка на занятие</h1>
          <table>
            <tr>
              <td style="font-weight: bold">Имя:</td>
              <td>${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Телефон:</td>
              <td>${phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Возраст:</td>
              <td>${age}</td>
            </tr>
          </table>
        </div>
      `,
    });
  }
}

export default new MailService();
