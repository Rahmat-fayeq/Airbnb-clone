import prisma from "@/libs/prisma";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description,
    } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price: parseFloat(price),
        locationValue: location.value,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (err: any) {
    console.log(err.message, "LISTING_ERROR");
  }
}
