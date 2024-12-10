import Sib from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "bharatudyog@gmail.com",
  name: "Super Admin",
};

export const sendEmail = (receivers, subject, textContent, htmlContent) =>
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      textContent: textContent,
      htmlContent: htmlContent,
    })
    .then((res) => console.log("email sent"))
    .catch((error) => console.log("error", error));
