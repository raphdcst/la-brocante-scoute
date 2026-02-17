import type { HelloAssoClient } from "@lecoq/helloasso-sdk";

import { PaymentError, type CreateCheckoutResult, type PaymentProvider } from "../../interface";

import type { HelloAssoCheckoutParams } from "./types";

export class HelloAssoAdapter implements PaymentProvider<HelloAssoCheckoutParams> {
  public readonly name = "helloasso";
  private client: HelloAssoClient;
  private organizationSlug: string;

  constructor(client: HelloAssoClient, organizationSlug: string) {
    this.client = client;
    this.organizationSlug = organizationSlug;
  }

  async createCheckout(params: HelloAssoCheckoutParams): Promise<CreateCheckoutResult> {
    const result = await this.client.initCheckout(
      { organizationSlug: this.organizationSlug },
      {
        totalAmount: params.amountInCents,
        initialAmount: params.amountInCents,
        itemName: params.itemName,
        backUrl: params.urls.backUrl,
        errorUrl: params.urls.errorUrl,
        returnUrl: params.urls.returnUrl,
        containsDonation: false,
        payer: {
          firstName: params.customer.firstName,
          lastName: params.customer.lastName,
          email: params.customer.email,
        },
        metadata: params.metadata,
      },
    );

    if (!result.redirectUrl || !result.id) {
      throw new PaymentError("HelloAsso checkout creation failed.");
    }

    return {
      checkoutUrl: result.redirectUrl,
      id: result.id.toString(),
    };
  }
}
