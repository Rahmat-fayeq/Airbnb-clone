import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(
            `http://localhost:3000/api/favorites/${listingId}`
          );
        } else {
          await axios.post(`http://localhost:3000/api/favorites/${listingId}`);
        }
        toast.success("Sucess");
        router.refresh();
      } catch (error: any) {
        toast.error(error);
      }
    },
    [currentUser, hasFavorited, listingId, router, loginModal]
  );

  return { hasFavorited, toggleFavorite };
}

export default useFavorite;
