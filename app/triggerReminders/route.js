import triggerRemindersService from "./service";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(req, res) {
  try {
    const response = await triggerRemindersService();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
