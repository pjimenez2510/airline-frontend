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

export const useCiudadesDestinoQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CIUDADES_DESTINO],
    queryFn: async () => await VueloService.getInstance().getCiudadesDestino(),
  });

  return query;
};

export const useCiudadesOrigenQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CIUDADES_ORIGEN],
    queryFn: async () => await VueloService.getInstance().getCiudadesOrigen(),
  });

  return query;
};

export const useBuscarVuelosQuery = (
  origen: string,
  destino: string,
  fecha: string
) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VUELOS, origen, destino, fecha],
    queryFn: async () =>
      await VueloService.getInstance().buscarVuelos(origen, destino, fecha),
    enabled: !!origen && !!destino && !!fecha,
  });

  return query;
};

export const useVueloPorIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VUELOS, id],
    queryFn: async () => await VueloService.getInstance().getVuelo(id),
    enabled: !!id,
  });

  return query;
};
