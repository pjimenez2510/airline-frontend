"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Reserva } from "../../interfaces/reserva.interface";

interface TablaReservasProps {
  reservas: Reserva[];
  onCancelarReserva: (reservaId: string) => Promise<void>;
}

export default function TablaReservas({
  reservas,
  onCancelarReserva,
}: TablaReservasProps) {
  const [cancelando, setCancelando] = useState<number | null>(null);

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  const handleCancelar = async (reservaId: number) => {
    setCancelando(reservaId);
    try {
      await onCancelarReserva(reservaId.toString());
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    } finally {
      setCancelando(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Reserva</TableHead>
          <TableHead>Fecha de Reserva</TableHead>
          <TableHead>Número de Vuelo</TableHead>
          <TableHead>Origen</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead>Fecha de Salida</TableHead>
          <TableHead>Número de Asiento</TableHead>
          <TableHead>Precio Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservas.map((reserva) => (
          <TableRow key={reserva.ReservaId}>
            <TableCell>{reserva.ReservaId}</TableCell>
            <TableCell>{formatearFecha(reserva.FechaReserva)}</TableCell>
            <TableCell>{reserva.Vuelo.NumeroVuelo}</TableCell>
            <TableCell>{reserva.Vuelo.Origen}</TableCell>
            <TableCell>{reserva.Vuelo.Destino}</TableCell>
            <TableCell>{formatearFecha(reserva.Vuelo.FechaSalida)}</TableCell>
            <TableCell>{reserva.NumeroAsiento}</TableCell>
            <TableCell>{formatearPrecio(reserva.PrecioTotal)}</TableCell>
            <TableCell>{reserva.Estado}</TableCell>
            <TableCell>
              <Button
                onClick={() => handleCancelar(reserva.ReservaId)}
                disabled={
                  reserva.Estado === "cancelada" ||
                  cancelando === reserva.ReservaId
                }
                variant="destructive"
              >
                {cancelando === reserva.ReservaId
                  ? "Cancelando..."
                  : "Cancelar"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
