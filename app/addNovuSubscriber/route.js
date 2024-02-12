import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import { setDocument } from "@/lib/firebaseAdmin";
import { addNovuSubscriber } from "@/lib/novu";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  try {
    if (req.method === "POST") {
      const { email, preferences } = body;
      const response = await addNovuSubscriber(email);

      await setDocument({
        collectionName: FIRESTORE_COLLECTIONS.USERS,
        documentId: email,
        document: { email, preferences, novu_info: response?.data },
      });

      return NextResponse.json(
        { message: "Subscribed to Notifications Successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
