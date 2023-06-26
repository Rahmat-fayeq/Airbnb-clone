import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Iparams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid listing id");
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (err: any) {
    console.log(err.message, "LISTINGID_ERROR");
    return NextResponse.error();
  }
}
