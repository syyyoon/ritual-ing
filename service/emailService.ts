import * as MailComposer from "expo-mail-composer";

const options = {
  recipients: ["syyoon1022@gmail.com"],
  subject: "문의 제목",
  body: "문의내용",
  attachments: ["path/to/file"],
};
async function sendMail() {
  let result = await MailComposer.composeAsync(options);
  console.log(result.status);
}

sendMail();
