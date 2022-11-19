export const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export const displayRazorpayPaymentSdk = async (
    amount,
    contact_number,
    email,
    order_id,
    verifyPayment
) => {


    const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. please check are you online?");
        return;
    }

    const options = {
        key: `${process.env.REACT_APP_RAZOR_PAY_KEY_TEST}`,
        amount: `${amount * 100}`,
        currency: "INR",
        name: `${process.env.REACT_APP_NAME}`,
        description: `${process.env.REACT_APP_DESCRIPTION}`,
        prefill: { contact: `${contact_number}`, email: `${email}` },
        order_id: `${order_id}`,
        handler: async (response) => {
            try {
                verifyPayment(
                    {
                        order_id: order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    }
                )
            } catch (err) {
            }
        },
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

}