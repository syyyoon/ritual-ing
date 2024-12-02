import * as MailComposer from "expo-mail-composer";

// const DEV_EMAIL_ADDRESS = process.env.EXPO_PUBLIC_DEV_EMAIL_ADDRESS as string;

const DEV_EMAIL_ADDRESS = process.env.EXPO_PUBLIC_DEV_EMAIL_ADDRESS || "syyoon1022@gmail.com"


const options = {
  recipients: [DEV_EMAIL_ADDRESS],
  subject: "문의 제목",
  body: "문의내용",
  attachments: ["path/to/file"],
};
async function sendMail() {
  let result = await MailComposer.composeAsync(options);
  console.log(result.status);
}

sendMail();
