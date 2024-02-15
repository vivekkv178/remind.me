import triggerRemindersService from "./service";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log("Request start");
    const response = await triggerRemindersService();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
