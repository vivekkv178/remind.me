import triggerRemindersService from "./service";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(req, res) {
  try {
    console.log("Request start");
    const response = await triggerRemindersService();
    return new Response(`Success`);
  } catch (error) {
    return new Response(`Fail`);
  }
}

// export const dynamic = "force-dynamic"; // static by default, unless reading the request

// export function GET(request) {
//   return new Response(`Hello from ${process.env.VERCEL_REGION}`);
// }
