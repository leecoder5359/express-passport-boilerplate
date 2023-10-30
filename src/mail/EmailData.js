import { goodByeTemplate } from "./template/goodBye.template.js";

export class EmailData {
    constructor(from, to, subject, html) {
        this.from = '보내는 사람 이름 <userId@gmail.com>';
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    static createGoodBye(to, name, template) {
        return new EmailData(
            '보내는 사람 이름 <userId@gmail.com>',
            to,
            `GoodBy ${name}`,
            template
        )
    }

    static createWelcome(to, name, template) {
        return new EmailData(
            '보내는 사람 이름 <userId@gmail.com>',
            to,
            `Hello ${name}`,
            template
        )
    }
}