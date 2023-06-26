import { getCurrentUser } from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

interface Iparams {
  listingId: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservation = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservation}
      />
    </>
  );
};

export default page;
