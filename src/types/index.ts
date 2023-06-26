import { Reservation, Listing } from "@prisma/client";

export type safeReservation = Reservation & {
  listing: Listing;
};
