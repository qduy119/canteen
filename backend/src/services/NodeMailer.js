const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

class NodeMailerService {
    #transporter;
    constructor(to) {
        // for testing
        // const transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: process.env.MAIL_POST,
        //     auth: {
        //         user: process.env.MAIL_USERNAME,
        //         pass: process.env.MAIL_PASSWORD,
        //     },
        // });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        this.#transporter = transporter;
        this.to = to;
    }

    async send(subject, item) {
        const html = `
            <div>
                <h1>${item.name} 🤩</h1>
                <img src="${item.thumbnail}"/>
                <p>Price: ${item.price}</p>
                <p>Discount: ${item.discount}</p>
                <p>Quantity: ${item.stock}</p>
            </div>
        `;

        const mailOptions = {
            from: process.env.GMAIL_FROM,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html),
        };

        await this.#transporter.sendMail(mailOptions);
    }
}

module.exports = NodeMailerService;
