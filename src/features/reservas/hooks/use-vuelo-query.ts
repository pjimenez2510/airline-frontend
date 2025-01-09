import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { VueloService } from "../services/vuelo.datasource";

export const useVuelosFuturosQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VUELOS],
    queryFn: async () => await VueloService.getInstance().vuelosFuturos(),
  });

  return query;
};
