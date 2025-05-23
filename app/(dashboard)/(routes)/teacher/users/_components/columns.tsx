"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Аты
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Эл-адрес
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Рөлі
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role");
      return typeof role === "string" ? (
        <Badge
          className={cn(
            "text-white",
            role === "ADMIN" && "bg-red-600",
            role === "MODERATOR" && "bg-yellow-400",
            role === "USER" && "bg-gray-500"
          )}
        >
          {role}
        </Badge>
      ) : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/teacher/users/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Өзгерту
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
