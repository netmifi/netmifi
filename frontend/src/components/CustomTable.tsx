import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteIcon from "@/assets/images/delete.svg";
import EditIcon from "@/assets/images/edit.svg";
import EyeIcon from "@/assets/images/eye.svg";
import { Checkbox } from "./ui/checkbox";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  cn,
  handleClipBoardCopy,
  splitCamelCaseToWords,
  splitSnakeCaseToWords,
} from "@/lib/utils";
import { CopyIcon, Loader2, X } from "lucide-react";
import { useWindowWidth } from "@/hooks";
import { Label } from "./ui/label";
import usePrivateAxios from "@/hooks/usePrivateAxios";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "@/api/axios";

export function CustomTooltip({
  onClick,
  children,
  hoverLabel,
}: CustomTableTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="bg-transparent border-none p-0 hover:bg-transparent hover:cursor-pointer"
            // variant="outline"
            onClick={onClick ?? undefined}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hoverLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
interface DataTableProps<TableData extends HasId> {
  data: TableData[];
  keys: (keyof TableData)[];
  lastpage?: number;
  pageSize: number;
  promptLabel: string;
  isDialog: boolean;
  setData: React.Dispatch<React.SetStateAction<TableData[]>>;
  ViewComponent?: React.ComponentType<{
    datum: TableData;
    // handleSubmit?: (updatedContact: newContactData) => void;
    setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  EditComponent?: React.ComponentType<{
    data: TableData;
    handleSubmit?: (updatedContact: newContactData) => void;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  deleteURL: string;
  isPending?: boolean;
}

const generateColumns = <TableData extends HasId>(
  keys: (keyof TableData)[]
): ColumnDef<TableData>[] => {
  const columns: ColumnDef<TableData>[] = keys.map((key) => ({
    id: String(key),
    accessorKey: key,
    header: () => (
      <div className="text-mg capitalize font-medium">
        {splitSnakeCaseToWords(String(key))}
      </div>
    ),
    cell: ({ row }) =>
      key === "embedCode" || key === "formUrl" ? (
        <div className="flex gap-2 cursor-pointer">
          {row.getValue(key as string)}
          <CopyIcon
            onClick={() => handleClipBoardCopy(row.getValue(key as string))}
            className="text-primary fill-light size-5"
          />
        </div>
      ) : key === "created_at" ? (
        <div>{new Date(row.getValue(key as string)).toLocaleDateString()}</div>
      ) : (
        <div>{row.getValue(key as string)}</div>
      ),
  }));

  return columns;
};

const selectColumn: ColumnDef<HasId> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      id="select all"
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

// const viewableRoutes = [
//   "/dashboard/contact",
//   "/dashboard/contact/",
//   "/dashboard/admin/",
//   "/dashboard/admin",
// ];

// function startsWithViewableRoute(pathname: string) {
//   return viewableRoutes.some((route) => pathname.startsWith(route));
// }

const actionsColumn: ColumnDef<HasId> = {
  id: "actions",
  header: () => <p className="text-center">Actions</p>,
  enableHiding: false,
  cell: ({ row, table }) => {
    const meta = table.options.meta as {
      handleView: (row: HasId) => void;
      handleDelete: (row: HasId) => void;
      handleEdit: (row: HasId) => void;
    };

    return (
      <div className="flex gap-2 items-center justify-center">
        <CustomTooltip
          onClick={() => meta?.handleView(row.original)}
          children={<img src={EyeIcon} alt="EyeIcon" />}
          hoverLabel={"View"}
        />

        <CustomTooltip
          onClick={() => meta?.handleEdit(row.original)}
          children={<img src={EditIcon} alt="EditIcon" />}
          hoverLabel={"Edit"}
        />
        <AlertDialog>
          <AlertDialogTrigger>
            {/* <img src={DeleteIcon} alt="DeleteIcon" /> */}
            <CustomTooltip
              //   onClick={() => meta?.handleDelete(row.original)}
              children={<img src={DeleteIcon} alt="DeleteIcon" />}
              hoverLabel={"Delete"}
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex">
              <div className="flex justify-between">
                <AlertDialogTitle>
                  Are you sure you want to delete this?
                </AlertDialogTitle>
                <AlertDialogCancel className="border-0 p-0">
                  <X />
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription>
                This will be permanently delete
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => meta?.handleDelete(row.original)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};
export default function CustomTable<TableData extends HasId>({
  data: tableData,
  keys,
  lastpage,
  pageSize,
  setData,
  isPending,
  isDialog,
  promptLabel,
  ViewComponent,
  EditComponent,
  deleteURL,
}: DataTableProps<TableData>) {
  const dynamicColumns = generateColumns(keys);
  const columns: ColumnDef<HasId, unknown>[] = [
    selectColumn as ColumnDef<HasId, unknown>,
    ...(dynamicColumns as ColumnDef<HasId, unknown>[]),
    actionsColumn as unknown as ColumnDef<HasId, unknown>,
  ];
  const privateAxios = usePrivateAxios();
  const width = useWindowWidth();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["contacts"];
  // const [tableData, setTableData] = useState(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [viewData, setViewData] = useState<TableData | null>(null);
  const [editData, setEditData] = useState<TableData | null>(null);

  const deleteRow = async (row: TableData) => {
    console.log("row", row);
    console.log(deleteURL);
    const response = await privateAxios.post(
      deleteURL,
      { id: row?.id },
      {
        headers: {
          team: "administrator",
        },
      }
    );
    return response.data;
  };

  const useDeleteRow = useMutation({
    mutationFn: (row) => deleteRow(row),
    onMutate: async (variables: TableData) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData(queryKey);
      previousState?.data?.filter((row: TableData) => row.id !== variables.id);

      const updatedData =
        previousState?.data?.filter(
          (row: TableData) => row.id !== variables.id
        ) || [];
      queryClient.setQueryData(queryKey, { data: updatedData });

      return { previousState };
    },
    onSuccess: (_, variables) => {
      toast.success(
        (variables.length as number) > 1
          ? `${variables.length} rows deleted successfully`
          : `${variables?.[promptLabel]} has been deleted`
      );
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Something Went Wrong!!!");
      console.error(error);
    },
  });
  const handleDelete = (row?: TableData) => {
    const selectedRows: TableData[] =
      table.getSelectedRowModel().rows.length > 0
        ? table.getSelectedRowModel().rows.map((r) => r.original)
        : [row!];

    selectedRows.forEach((row) => useDeleteRow.mutate(row));
  };

  const handleEdit = (row?: TableData) => {
    setEditData(row || null);
    setIsFormOpen(true);
  };

  const handleView = (row?: TableData) => {
    setViewData(row || null);
    setIsViewOpen(true);
  };
  const handleSubmit = (updatedDetails: TableData) => {
    const updatedData = tableData.map((item) =>
      item.id === updatedDetails.id
        ? {
            ...item,
            ...updatedDetails,
            date: new Date().toUTCString(),
          }
        : item
    );
    setData(updatedData);
    setIsFormOpen(false);
    toast.success("Details updated successfully");
  };

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: isPending ? 10 : pageSize,
        pageIndex: 0,
      },
    },
    meta: {
      handleView: handleView,
      handleEdit: handleEdit,
      handleDelete: handleDelete,
    },
  });
  const showDelete =
    !table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected();

  return (
    <div className="w-full">
      <div className="">
        {isFormOpen && EditComponent && (
          <>
            {isDialog ? (
              <AlertDialog open>
                <AlertDialogContent className="w-3/4 max-h-[98vh] overflow-y-auto">
                  <EditComponent
                    data={editData!}
                    handleSubmit={handleSubmit}
                    setIsFormOpen={setIsFormOpen}
                  />
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <EditComponent data={editData!} setIsFormOpen={setIsFormOpen} />
            )}
          </>
        )}

        {isViewOpen && ViewComponent && (
          <>
            {isDialog ? (
              <AlertDialog open>
                <AlertDialogContent className="w-3/4 max-h-[98vh] overflow-y-auto">
                  <ViewComponent
                    datum={viewData!}
                    setIsViewOpen={setIsViewOpen}
                  />
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <ViewComponent datum={viewData!} setIsViewOpen={setIsViewOpen} />
            )}
          </>
        )}

        {!isFormOpen && !isViewOpen && (
          <>
            {width && width > 729 ? (
              <TableComponent className="bg-white rounded-xl">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ||
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isPending ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="grid place-items-center">
                          <Loader2 size={20} className="animate-spin m-auto" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableComponent>
            ) : (
              <div className="flex flex-col gap-5">
                <span className="bg-white p-4 rounded-xl sticky top-0"></span>
              </div>
            )}
          </>
        )}
      </div>

      {!isFormOpen && !isViewOpen && (
        <div className="flex flex-wrap items-center border-2 rounded-xl border-muted bg-white my-5 py-1 px-5">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </span>
          <Pagination className="flex-1">
            <PaginationContent>
              <PaginationItem>
                <Button
                  className="hover:bg-transparent"
                  variant="ghost"
                  disabled={!table.getCanPreviousPage()}
                >
                  <PaginationPrevious onClick={() => table.previousPage()} />
                </Button>
              </PaginationItem>
              <PaginationItem>
                {Array.from(
                  { length: lastpage ?? table.getPageCount() },
                  (_, i) => (
                    <PaginationLink
                      className="cursor-pointer"
                      key={i}
                      isActive={i === table.getState().pagination.pageIndex}
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </PaginationLink>
                  )
                )}
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="hover:bg-transparent"
                  variant="ghost"
                  disabled={!table.getCanNextPage()}
                >
                  <PaginationNext onClick={() => table.nextPage()} />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={showDelete}
                variant="ghost"
                className="hover:bg-transparent"
              >
                <p>Delete Selected</p>&nbsp;
                <img src={DeleteIcon} alt="DeleteIcon" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete{" "}
                  {table.getSelectedRowModel().rows.length}{" "}
                  {splitCamelCaseToWords(promptLabel).toLowerCase()}(s)?
                </AlertDialogTitle>
                {table.getSelectedRowModel().rows.map((row, index) => (
                  <AlertDialogDescription
                    key={index}
                    className="text-primary text-sm"
                  >
                    {`${row.getValue(promptLabel as string)}`}
                  </AlertDialogDescription>
                ))}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete()} type="button">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
