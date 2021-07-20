import React, { useEffect, useRef } from 'react'

const Paypal = ({ plan }) => {

    //add client_id in script tag

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: `${plan.plan_name}`,
                            amount: {
                                currency_code: "USD",
                                value: plan.plan_amount,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: (err) => {
                console.log(err);
            },
        }).render(paypal.current)
    }, [plan])

    const paypal = useRef()
    return (
        <div>
            <div ref={paypal}></div>
            <a href="/"><button>Back</button></a>
        </div>
    )
}

export default Paypal