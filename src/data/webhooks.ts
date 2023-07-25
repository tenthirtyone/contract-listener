// This data will become the model for a db once it's refined
import { Webhook } from "@/types";

export const mockWebhooks: Webhook[] = [
  {
    url: process.env.WEBHOOK_URL,
  },
];
