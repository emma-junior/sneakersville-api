let crypto = await import("node:crypto");
var secret = process.env.PAYSTACK_KEY;
// Using Express
export const paystackPayment = async (req, res) => {
  //validate event
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event
    console.log(event);
  }
  res.sendStatus(200);
};
