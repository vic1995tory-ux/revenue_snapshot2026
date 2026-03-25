export async function POST(req: Request) {
  const body = await req.json();

  // достаёшь нужные поля
  const payment_id = body.resource?.id;
  const email = body.resource?.payer?.email_address;
  const first_name = body.resource?.payer?.name?.given_name;
  const amount = body.resource?.amount?.value;

  // фильтр: только успешные платежи
  const status = body.event_type;

  if (status !== "PAYMENT.CAPTURE.COMPLETED") {
    return new Response(JSON.stringify({ ok: false }));
  }

  // отправка в Make webhook
  await fetch("https://hook.eu2.make.com/XXXXXXXX", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_id,
      payer_email: email,
      first_name,
      gross_amount: amount,
      source: "paypal",
      payment_status: "confirmed",
      raw_payload: body,
    }),
  });

  return new Response(JSON.stringify({ ok: true }));
}
