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
import Link from "next/link";
import { Vuelo } from "../../interfaces/vuelo.interface";

interface TablaVuelosProps {
  vuelos: Vuelo[];
}

export default function TablaVuelos({ vuelos }: TablaVuelosProps) {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Vuelo</TableHead>
          <TableHead>Origen</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead>Fecha de Salida</TableHead>
          <TableHead>Fecha de Llegada</TableHead>
          <TableHead>Asientos Disponibles</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vuelos.map((vuelo) => (
          <TableRow key={vuelo.VueloId}>
            <TableCell>{vuelo.NumeroVuelo}</TableCell>
            <TableCell>{vuelo.Origen}</TableCell>
            <TableCell>{vuelo.Destino}</TableCell>
            <TableCell>{formatearFecha(vuelo.FechaSalida)}</TableCell>
            <TableCell>{formatearFecha(vuelo.FechaLlegada)}</TableCell>
            <TableCell>{vuelo.AsientosDisponibles}</TableCell>
            <TableCell>{formatearPrecio(vuelo.Precio)}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={`/vuelo-reserva/${vuelo.VueloId}`}>Reservar</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
