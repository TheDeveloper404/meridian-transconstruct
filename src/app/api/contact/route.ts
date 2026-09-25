import { getContactService } from "@/server/contact";
import { trustProxyHeaders } from "@/server/contact/config";
import { handleContactRequest } from "@/server/contact/http";

export async function POST(request: Request): Promise<Response> {
  return handleContactRequest(request, getContactService(), { trustProxy: trustProxyHeaders() });
}
