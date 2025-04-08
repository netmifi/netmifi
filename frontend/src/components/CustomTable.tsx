/* eslint-disable @typescript-eslint/no-explicit-any */
// REUSABLE TABLE FOR DATA DISPLAY
import { Key, useState } from "react";
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
import { Form } from "./ui/form";
import { Checkbox } from "./ui/checkbox";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  cn,
  deleteConfirmationSchema,
  handleClipBoardCopy,
  splitCamelCaseToWords,
  splitSnakeCaseToWords,
} from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  BanIcon,
  CopyIcon,
  EditIcon,
  EyeIcon,
  Loader2,
  TrashIcon,
  X,
} from "lucide-react";
import { Label } from "./ui/label";
import useWindowSize from "@/hooks/useWindowSize";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ClassValue } from "clsx";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "./form/CustomFormField";
import Loader from "./Loader";
// import usePrivateAxios from "@/hooks/usePrivateAxios";
// import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "@/api/axios";

export function CustomTooltip({
  onClick,
  children,
  hoverLabel,
}: CustomTableTooltipProps) {
  // reusable actions tooltip
  return (
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
  );
}
interface DataTableProps<TableData extends HasId> {
  data: TableData[];
  keys: (keyof TableData)[]; // columns you would like to display on table
  lastPage?: number; // last page of lazy loaded (paginated) data
  pageSize: number; // number of rows on page !!! COULD BE DEPRECATED !!!
  promptLabel: string; // primary key you want to display
  isDialog: boolean;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  setData: React.Dispatch<React.SetStateAction<TableData[]>>; // update data
  ViewComponent?: React.ComponentType<{
    datum: TableData; // data to display
    // handleSubmit?: (updatedContact: newContactData) => void;
    setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>; // view component custom trigger off/on
  }>; // component to view all data details
  EditComponent?: React.ComponentType<{
    data: TableData;
    handleSubmit?: (updatedContact: newContactData) => void;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>; // component for editing
  deleteURL: string; // url for deleting one or multiple data
  clearAllURL?: string;
  isPending?: boolean;
  specialStyle: {
    column: string;
    className: ClassValue;
  }[]; // this helps you apply custom style to your column
}

const generateColumns = <TableData extends HasId>(
  keys: (keyof TableData)[]
): ColumnDef<TableData>[] => {
  const columns: ColumnDef<TableData>[] = keys.map((key) => ({
    id: String(key),
    accessorKey: key,
    sortingFn: "alphanumeric",
    header: () => (
      <div className="text-mg capitalize font-medium">
        {splitCamelCaseToWords(
          String(
            key.toString().toLocaleLowerCase().includes("price") ||
              key.toString().toLocaleLowerCase().includes("amount")
              ? String(key) + "(#)"
              : key
          )
        )}
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
      ) : key === "createdAt" ||
        key === "date" ||
        key === "updatedAt" ||
        key === "certifiedOn" ? (
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
      className="data-[state=checked]:bg-red rounded-full"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="rounded-full"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export default function CustomTable<TableData extends HasId>({
  data: tableData,
  keys,
  lastPage,
  pageSize,
  setData,
  isPending,
  isDialog,
  isView = true,
  isEdit = true,
  isDelete = true,
  promptLabel,
  ViewComponent,
  EditComponent,
  deleteURL,
  clearAllURL,
  specialStyle = [],
}: DataTableProps<TableData>) {
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
          {isView && (
            <CustomTooltip
              onClick={() => meta?.handleView(row.original)}
              children={<EyeIcon className="size-4" />}
              hoverLabel={"View"}
            />
          )}

          {isEdit && (
            <CustomTooltip
              onClick={() => meta?.handleEdit(row.original)}
              children={<EditIcon className="size-4" />}
              hoverLabel={"Edit"}
            />
          )}
          {isDelete && (
            <AlertDialog>
              <AlertDialogTrigger>
                {/* <img src={DeleteIcon} alt="DeleteIcon" /> */}
                <CustomTooltip
                  //   onClick={() => meta?.handleDelete(row.original)}
                  children={<TrashIcon className="size-4" />}
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
          )}
        </div>
      );
    },
  };

  const dynamicColumns = generateColumns(keys);

  const columns: ColumnDef<HasId, unknown>[] = [
    selectColumn as ColumnDef<HasId, unknown>,
    ...(dynamicColumns as ColumnDef<HasId, unknown>[]),
    actionsColumn as unknown as ColumnDef<HasId, unknown>,
  ];
  // const privateAxios = usePrivateAxios();
  const { width } = useWindowSize();
  // const queryClient = useQueryClient();
  // const queryKey: QueryKey = ["contacts"];
  // const [tableData, setTableData] = useState(data);

  const [globalFilter, setGlobalFilter] = useState("");
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
    // const response = await privateAxios.post(
    //   deleteURL,
    //   { id: row?.id },
    //   {
    //     headers: {
    //       team: "administrator",
    //     },
    //   }
    // );
    // return response.data;
  };

  // const useDeleteRow = useMutation({
  //   mutationFn: (row) => deleteRow(row),
  //   onMutate: async (variables: TableData) => {
  //     await queryClient.cancelQueries({ queryKey });

  //     const previousState = queryClient.getQueryData(queryKey);
  //     previousState?.data?.filter((row: TableData) => row.id !== variables.id);

  //     const updatedData =
  //       previousState?.data?.filter(
  //         (row: TableData) => row.id !== variables.id
  //       ) || [];
  //     queryClient.setQueryData(queryKey, { data: updatedData });

  //     return { previousState };
  //   },
  //   onSuccess: (_, variables) => {
  //     toast.success(
  //       (variables.length as number) > 1
  //         ? `${variables.length} rows deleted successfully`
  //         : `${variables?.[promptLabel]} has been deleted`
  //     );
  //   },
  //   onError: (error, _, context) => {
  //     queryClient.setQueryData(queryKey, context?.previousState);
  //     toast.error("Something Went Wrong!!!");
  //     console.error(error);
  //   },
  // });
  const handleDelete = (row?: TableData) => {
    const selectedRows: TableData[] =
      table.getSelectedRowModel().rows.length > 0
        ? table
            .getSelectedRowModel()
            .rows.map((r: { original: any }) => r.original)
        : [row!];

    // selectedRows.forEach((row) => useDeleteRow.mutate(row));
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
    enableSorting: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
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

  const [isClearAllLoading, setIsClearAllLoading] = useState(false);
  const clearAllFormSchema = deleteConfirmationSchema("i have consent");
  const clearAllForm = useForm<z.infer<typeof clearAllFormSchema>>({
    resolver: zodResolver(clearAllFormSchema),
  });

  const handleClearAll = () => {
    console.log("submit");
  };

  return (
    <div className="w-full px-2">
      <div className="w-full flex justify-between mb-4 flex-wrap gap-2 max-sm:justify-end">
        <div className="min-w-[60%] max-sm:flex-grow flex items-center bg-secondary transition-all focus-within:bg-transparent rounded-full border border-secondary px-2">
          <Input
            className="outline-none border-none bg-transparent"
            placeholder="Search here..."
            id="search"
            value={globalFilter ?? ""}
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          />
          <Label
            htmlFor="search"
            className={cn("px-3 cursor-pointer", {
              "opacity-0": !globalFilter,
            })}
            onClick={() => setGlobalFilter("")}
          >
            <X className="size-4" />
          </Label>
        </div>

        {clearAllURL && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 [&_svg]:size-5 rounded-full">
                <BanIcon /> Clear All
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear All Records</DialogTitle>
                <DialogDescription className="text-red">
                  All records on our cloud would be cleared, it is a
                  non-reversible action
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Form {...clearAllForm}>
                  <form
                    onSubmit={clearAllForm.handleSubmit(handleClearAll)}
                    className="w-full flex flex-col gap-6"
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-3">
                        <span className="text-xs">Confirmation sentence</span>
                        <p className="lowercase text-base font-bold font-poppins pointer-events-auto cursor-none">
                          i have consent
                        </p>
                      </div>

                      <CustomFormField
                        name="sentence"
                        control={clearAllForm.control}
                        // label="Confirmation sentence"
                        placeholder="Type in confirmation..."
                        isNotLabeled
                      />
                    </div>

                    <Button type="submit" disabled={isClearAllLoading}>
                      {isClearAllLoading ? <Loader type="all" /> : "Consent"}
                    </Button>
                  </form>
                </Form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
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
                <AlertDialogContent className="w-3/4 max-sm:w-full max-h-[98vh] overflow-y-auto">
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
            {/* {width && width > 729 ? ( */}
            <ScrollArea>
              <TableComponent className="bg-popover rounded-xl min-w-[90em]">
                <TableHeader className="">
                  {table
                    .getHeaderGroups()
                    .map(
                      (headerGroup: {
                        id: Key | null | undefined;
                        headers: never[];
                      }) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map(
                            (header: {
                              id: Key | null | undefined;
                              isPlaceholder: never;
                              column: { columnDef: { header: never } };
                              getContext: () => unknown;
                            }) => (
                              <TableHead key={header.id}>
                                <div
                                  className="flex items-center gap-px"
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {header.isPlaceholder ||
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  {{
                                    //display a relevant icon for sorting order:
                                    asc: <ArrowUp size={14} />,
                                    desc: <ArrowDown size={14} />,
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </div>
                              </TableHead>
                            )
                          )}
                        </TableRow>
                      )
                    )}
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
                    table
                      .getRowModel()
                      .rows.map(
                        (row: {
                          id: Key | null | undefined;
                          getIsSelected: () => any;
                          getVisibleCells: () => any[];
                        }) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row
                              .getVisibleCells()
                              .map(
                                (cell: {
                                  row: any;
                                  id: Key | null | undefined;
                                  column: { columnDef: { cell: any } };
                                  getContext: () => any;
                                }) => (
                                  <TableCell
                                    key={cell.id}
                                    className={
                                      (specialStyle.length > 0
                                        ? specialStyle.map(
                                            ({ column, className }) =>
                                              cell?.id?.split("_")[1] === column
                                                ? className
                                                : ""
                                          )
                                        : "") as string
                                    }
                                  >
                                    <div
                                      className={cn({
                                        "w-full text-center p-2 rounded-md":
                                          cell?.id?.split("_")[1] === "status",
                                        "bg-green-500 text-popover":
                                          cell.row.original.status ===
                                            "success" &&
                                          cell?.id?.split("_")[1] === "status",
                                        "bg-low-red text-primary":
                                          cell.row.original.status ===
                                            "error" &&
                                          cell?.id?.split("_")[1] === "status",
                                        "bg-yellow-500":
                                          cell.row.original.status ===
                                            "pending" &&
                                          cell?.id?.split("_")[1] === "status",
                                      })}
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </div>
                                  </TableCell>
                                )
                              )}
                          </TableRow>
                        )
                      )
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* // ) : (
              // <div className="flex flex-col gap-5">
              //   <span className="bg-white p-4 rounded-xl sticky top-0"></span>
              // </div>
            // )} */}
          </>
        )}
      </div>

      {!isFormOpen && !isViewOpen && (
        <div className="flex flex-col gap-2 bg-popover mt-2">
          <div className="w-full flex flex-wrap items-center border-2 rounded-xl border-muted my-5 py-1 px-5">
            <Pagination className="flex-1 w-full p-0">
              <PaginationContent className="p-0">
                <PaginationItem>
                  <Button
                    className="[&_span]:max-md:hidden"
                    size={"no-pad"}
                    variant="ghost"
                    disabled={!table.getCanPreviousPage()}
                  >
                    <PaginationPrevious onClick={() => table.previousPage()} />
                  </Button>
                </PaginationItem>
                {/* FIXME: fix pagination wrapping issues */}
                <PaginationItem className="justify-center items-center max-w-[80%] overflow-x-auto">
                  {/* <div className="flex max-w-full overflow-x-auto"> */}
                  {Array.from(
                    { length: lastPage ?? table.getPageCount() },
                    (_, i) => (
                      <PaginationLink
                        key={i}
                        isActive={i === table.getState().pagination.pageIndex}
                        onClick={() => table.setPageIndex(i)}
                        className={cn("cursor-pointer rounded-xl", {
                          "border-red":
                            i === table.getState().pagination.pageIndex,
                        })}
                      >
                        {i + 1}
                      </PaginationLink>
                    )
                  )}
                  {/* </div>++ */}
                </PaginationItem>
                <PaginationItem>
                  <Button
                    className="hover:bg-transparent"
                    variant="ghost"
                    size={"no-pad"}
                    disabled={!table.getCanNextPage()}
                  >
                    <PaginationNext
                      className="[&_span]:max-md:hidden"
                      onClick={() => table.nextPage()}
                    />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="flex justify-between pl-3">
            <span className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </span>

            {isDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={showDelete}
                    variant="ghost"
                    className="hover:bg-transparent"
                  >
                    <p>Delete Selected</p>&nbsp;
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete{" "}
                      {table.getSelectedRowModel().rows.length}{" "}
                      {splitCamelCaseToWords(promptLabel).toLowerCase()}(s)?
                    </AlertDialogTitle>
                    {table
                      .getSelectedRowModel()
                      .rows.map(
                        (
                          row: { getValue: (arg0: string) => any },
                          index: Key | null | undefined
                        ) => (
                          <AlertDialogDescription
                            key={index}
                            className="text-primary text-sm"
                          >
                            {`${row.getValue(promptLabel as string)}`}
                          </AlertDialogDescription>
                        )
                      )}
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete()}
                      type="button"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
