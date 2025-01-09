"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReservaPorVueloQuery } from "../../hooks/use-reserva-query";
import { useVueloPorIdQuery } from "../../hooks/use-vuelo-query";
import { ReservaService } from "../../services/reserva.datasource";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";

interface NuevaReservaViewProps {
  idVuelo: string;
}

export default function NuevaReservaView({ idVuelo }: NuevaReservaViewProps) {
  const { data: reservas, isLoading: isLoadingReserva } =
    useReservaPorVueloQuery(idVuelo);
  const { data: vuelo, isLoading: isLoadingVuelo } =
    useVueloPorIdQuery(idVuelo);
  const [asiento, setAsiento] = useState("");
  const router = useRouter();
  const { data: sesion } = useSession();

  const handleReservar = async () => {
    try {
      if (!asiento) {
        toast.error("Por favor, seleccione un asiento.");
        return;
      }
      await ReservaService.getInstance().crearReserva(
        idVuelo,
        sesion?.user?.id as string,
        asiento
      );
      toast.success("Reserva realizada con éxito.");
      router.push("/mis-reservas");
      invalidateQuery([QUERY_KEYS.RESERVA]);
      invalidateQuery([QUERY_KEYS.CIUDADES_DESTINO]);
      invalidateQuery([QUERY_KEYS.CIUDADES_ORIGEN]);
      invalidateQuery([QUERY_KEYS.VUELOS]);
    } catch (error) {
      console.error("Error al reservar:", error);
    }
  };

  if (isLoadingReserva || isLoadingVuelo) {
    return (
      <div className="text-center py-10">Cargando información del vuelo...</div>
    );
  }

  if (!vuelo || !reservas) {
    return (
      <div className="text-center py-10 text-red-500">
        Error al cargar la información del vuelo.
      </div>
    );
  }

  const asientosOcupados = new Set(
    reservas
      ?.filter((r) => r.Estado !== "cancelada")
      .map((r) => r.NumeroAsiento)
  );
  const asientosDisponibles = Array.from(
    { length: vuelo.AsientosDisponibles },
    (_, i) => (i + 1).toString()
  ).filter((num) => !asientosOcupados.has(num));

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Nueva Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Número de Vuelo</Label>
              <p className="font-medium">{vuelo.NumeroVuelo}</p>
            </div>
            <div>
              <Label>Origen - Destino</Label>
              <p className="font-medium">
                {vuelo.Origen} - {vuelo.Destino}
              </p>
            </div>
            <div>
              <Label>Fecha de Salida</Label>
              <p className="font-medium">{formatearFecha(vuelo.FechaSalida)}</p>
            </div>
            <div>
              <Label>Fecha de Llegada</Label>
              <p className="font-medium">
                {formatearFecha(vuelo.FechaLlegada)}
              </p>
            </div>
            <div>
              <Label>Precio</Label>
              <p className="font-medium">
                {vuelo.Precio.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            </div>
            <div>
              <Label htmlFor="asiento">Seleccionar Asiento</Label>
              <Select value={asiento} onValueChange={setAsiento}>
                <SelectTrigger id="asiento">
                  <SelectValue placeholder="Seleccione un asiento" />
                </SelectTrigger>
                <SelectContent>
                  {asientosDisponibles.map((num) => (
                    <SelectItem key={num} value={num}>
                      Asiento {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReservar} disabled={!asiento}>
            Realizar Reserva
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
