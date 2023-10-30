import mailer from "nodemailer";
import { EmailData } from "./EmailData.js";
import { welcomeTemplate } from "./template/welcome.template.js";
import { goodByeTemplate } from "./template/goodBye.template.js";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "../config/env.config.js";

export const sendMail = async (to, name, type) => {
    const transporter = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: GOOGLE_EMAIL,
            pass: GOOGLE_EMAIL_PASSWORD,
        },
    });

    const mail = getEmailData(to, name, type);

    try {
        await transporter.sendMail(mail);
        console.log("email sent successfully");
    } catch (e) {
        console.log(e);
    }
};

const getEmailData = (to, name, template) => {
    switch (template) {
        case "welcome":
            return EmailData.createWelcome(to, name, welcomeTemplate)
        case "goodbye":
            return EmailData.createGoodBye(to, name, goodByeTemplate)
    }
}