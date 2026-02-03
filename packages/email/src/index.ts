import { env } from "@la-brocante-scoute/env/server";

import { resend } from "./resend";

export * from "./templates";

export async function sendEmail(params: { to: string; subject: string; html: string }) {
  const res = await resend.emails.send({
    from: env.EMAIL_FROM,
    ...params,
  });

  return res;
}
