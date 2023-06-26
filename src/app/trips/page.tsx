import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized!" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found!"
        subtitle="Looks you have not reserved any trips yet."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default page;
