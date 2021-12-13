import SgMail from "@sendgrid/mail";
const emailApiKey = process.env.EMAIL_API_KEY;

/**
 * @description it is help to send email using subject, body and to (array of email address)
 * @return {void}
 */
export async function sendEmail(subject, body, to) {
  SgMail.setApiKey(emailApiKey);
  const msg = {
    to,
    from: {
      name: "BP ONLINE BLOGGING",
      email: "noreplybponline@gmail.com",
    },
    subject: subject,
    html: body,
    text: body,
  };
  SgMail.sendMultiple(msg)
    .then((ee) => console.log("Email sent successfully"))
    .catch((err) => console.log("58", JSON.stringify(err)));
}
