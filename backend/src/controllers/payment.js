const moment = require("moment");
const querystring = require("qs");
const crypto = require("crypto");
const { Payment } = require("../models");

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}

module.exports = class ItemController {
    static async getAll(req, res) {
        try {
            const { userId } = req.query;
            let data;
            if (userId) {
                data = await Payment.findAll({
                    where: { userId },
                });
            } else {
                data = await Payment.findAll({
                    include: "user",
                });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            const data = await Payment.create(payload);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            await Payment.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // static async createCheckoutSession(req, res) {
    //     try {
    //         const { items, paymentId, orderId } = req.body;
    //         const lineItems = items.map((item) => ({
    //             price_data: {
    //                 currency: "usd",
    //                 product_data: {
    //                     name: item.item.name,
    //                     images: [item.item.thumbnail],
    //                 },
    //                 unit_amount:
    //                     Number(
    //                         item.item.price *
    //                             (1 - item.item.discount * 0.01).toFixed(2)
    //                     ) * 100,
    //             },
    //             quantity: item.quantity,
    //         }));
    //         const session = await stripe.checkout.sessions.create({
    //             line_items: lineItems,
    //             payment_method_types: ["card"],
    //             mode: "payment",
    //             success_url: `${process.env.CLIENT_DOMAIN}/payment-success?paymentId=${paymentId}&orderId=${orderId}`,
    //             cancel_url: `${process.env.CLIENT_DOMAIN}/payment-cancel?paymentId=${paymentId}&orderId=${orderId}`,
    //         });

    //         res.status(200).json({ sessionUrl: session.url });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ error });
    //     }
    // }
    static async createPaymentUrl(req, res) {
        try {
            const { orderId, amount, bankCode } = req.body;
            process.env.TZ = "Asia/Ho_Chi_Minh";

            const date = new Date();
            const createDate = moment(date).format("YYYYMMDDHHmmss");

            const ipAddr =
                req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            const tmnCode = process.env.VNP_TMNCODE;
            const secretKey = process.env.VNP_HASHSECRET;
            let vnpUrl = process.env.VNP_URL;
            const returnUrl = process.env.VNP_RETURN_URL;

            let locale = req.body.language;
            if (!locale) {
                locale = "vn";
            }
            const currCode = "USD";
            let vnp_Params = {};
            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = tmnCode;
            vnp_Params["vnp_Locale"] = locale;
            vnp_Params["vnp_CurrCode"] = currCode;
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] =
                "Payment for transaction ID: " + orderId;
            vnp_Params["vnp_OrderType"] = "other";
            vnp_Params["vnp_Amount"] = amount * 100000;
            vnp_Params["vnp_ReturnUrl"] = returnUrl;
            vnp_Params["vnp_IpAddr"] = ipAddr;
            vnp_Params["vnp_CreateDate"] = createDate;
            if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);

            const signData = querystring.stringify(vnp_Params, {
                encode: false,
            });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac
                .update(new Buffer.from(signData, "utf-8"))
                .digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl +=
                "?" + querystring.stringify(vnp_Params, { encode: false });
            res.status(200).json({ url: vnpUrl });
        } catch (error) {
            console.log(error);
        }
    }
};
