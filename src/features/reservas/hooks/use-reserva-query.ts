import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { ReservaService } from "../services/reserva.datasource";

export const useReservaPorVueloQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RESERVA, id],
    queryFn: async () =>
      await ReservaService.getInstance().reservasPorVuelo(id),
    enabled: !!id,
  });

  return query;
};

export const useReservaPorUsuarioQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RESERVA, id],
    queryFn: async () =>
      await ReservaService.getInstance().reservasPorUsuario(id),
    enabled: !!id,
  });

  return query;
};

export const useReservaPorIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RESERVA, id],
    queryFn: async () => await ReservaService.getInstance().reservaPorId(id),
    enabled: !!id,
  });

  return query;
};
