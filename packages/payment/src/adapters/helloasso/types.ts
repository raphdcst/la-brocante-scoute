import type { HelloAssoClientOptions } from "@lecoq/helloasso-sdk";
import type { BaseCheckoutParams } from "../../interface";

export type HelloAssoConfig = HelloAssoClientOptions & {
  organizationSlug: string;
};

export interface HelloAssoCheckoutParams extends BaseCheckoutParams {
  urls: {
    backUrl: string;
    errorUrl: string;
    returnUrl: string;
  };
}
