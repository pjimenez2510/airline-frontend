"use client";
import { useSession } from "next-auth/react";
import { useReservaPorUsuarioQuery } from "../../hooks/use-reserva-query";
import TablaReservas from "../components/tabla-reservas";
import { ReservaService } from "../../services/reserva.datasource";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";

export default function ReservasView() {
  const { data } = useSession();
  const { data: reservas, isLoading } = useReservaPorUsuarioQuery(
    data?.user?.id as string
  );

  if (isLoading) {
    return <div className="text-center py-10">Cargando reservas...</div>;
  }

  const handleCancelarReserva = async (reservaId: string) => {
    try {
      await ReservaService.getInstance().cancelarReserva(
        reservaId,
        data?.user?.id as string
      );
      invalidateQuery([QUERY_KEYS.RESERVA]);
      invalidateQuery([QUERY_KEYS.CIUDADES_DESTINO]);
      invalidateQuery([QUERY_KEYS.VUELOS]);
      invalidateQuery([QUERY_KEYS.CIUDADES_ORIGEN]);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  return (
    <TablaReservas
      reservas={reservas || []}
      onCancelarReserva={handleCancelarReserva}
    />
  );
}
