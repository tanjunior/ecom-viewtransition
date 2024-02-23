import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Product } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Icons from "../Icons";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "../forms/productForm";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const productId = row.original.id;

      return <DeleteButton id={productId} />;
    },
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Dialog>
          <DialogTrigger>Edit</DialogTrigger>
          <DialogContent>
            <ProductForm product={product} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function DeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();

  return (
    <Button
      color="danger"
      onClick={() =>
        fetch(`'https://fakestoreapi.com/products/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            toast("deleted");
            queryClient.invalidateQueries({
              queryKey: ["products"],
            });
          }
        })
      }
    >
      Delete
    </Button>
  );
}
