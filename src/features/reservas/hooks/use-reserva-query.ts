import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { ReservaService } from "../services/reserva.datasource";

export const useReservaPorVueloQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RESERVA, id],
    queryFn: async () => await ReservaService.getInstance().reservaPorVuelo(id),
    enabled: !!id,
  });

  return query;
};
