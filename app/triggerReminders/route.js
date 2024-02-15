import triggerRemindersService from "./service";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log("Request start");
    // const response = await triggerRemindersService();
    return new Response(`Success`);
  } catch (error) {
    return new Response(`Fail`);
  }
}
