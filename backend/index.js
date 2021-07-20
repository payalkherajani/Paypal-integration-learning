const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()
const paypal = require('paypal-rest-sdk')

app.use(cors())
connectDB()
app.use(express.json())

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

app.post('/pay', (req, res) => {
    const { planDetails } = req.body

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": `${planDetails.plan_name}`,
                    "price": `${planDetails.plan_amount}`,
                    "currency": "USD",
                    "quantity": "1"   //this is required field
                }]
            },
            "amount": {
                "currency": "USD",
                "total": `${planDetails.plan_amount}`
            },
            "description": "Subscription Details"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    console.log(payment.links[i].href, "got this")
                    res.redirect(payment.links[i].href)  //cors-error-coming-here-for-redirection
                }
            }
        }
    });

})

app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send("success")
        }
    });


})

app.get('/cancel', (req, res) => {
    res.send("Cancel")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))