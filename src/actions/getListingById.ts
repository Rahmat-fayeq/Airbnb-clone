import prisma from "@/libs/prisma";

interface Iparams {
  listingId: string;
}

async function getListingById(params: Iparams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default getListingById;
