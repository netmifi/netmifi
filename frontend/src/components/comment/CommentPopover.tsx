import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical } from "lucide-react";
import { FaFlag, FaTrash } from "react-icons/fa6";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";

const CommentPopover = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <></>
      <PopoverContent className="flex flex-col w-fit p-0 overflow-hidden *:flex *:gap-1 *:justify-start">
        <Button
          variant={"transparent"}
          className="hover:bg-primary hover:text-sm hover:text-primary-foreground rounded-none"
        >
          <FaFlag size={20} /> Report
        </Button>
        {isCurrentUser && (
          <>
            <Button
              variant={"transparent"}
              className="hover:bg-primary hover:text-sm hover:text-primary-foreground rounded-none"
            >
              <FaEdit size={20} />
              Edit
            </Button>
            <Button
              variant={"transparent"}
              className="hover:bg-primary hover:text-sm hover:text-primary-foreground rounded-none"
            >
              <FaTrash size={20} /> Delete
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CommentPopover;
