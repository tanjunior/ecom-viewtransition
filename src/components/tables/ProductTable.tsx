import { Product } from "@/lib/types";
import { DataTable } from "./DataTable";
import { columns } from "./ProductTableColumns"

export default function ProductTable({data} : {data:Product[]}) {
  return (
    <DataTable columns={columns} data={data} showColumnVisibility={true} />
  )
}
