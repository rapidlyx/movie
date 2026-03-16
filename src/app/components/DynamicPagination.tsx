"use client";
import { cn } from "@/lib/utils";
import { usePagination } from "../_hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type DynamicPaginationProps = { totalPages: number };

export const DynamicPagination = ({ totalPages }: DynamicPaginationProps) => {
  const {
    currentPage,
    handleNext,
    handlePageChange,
    handlePrevious,
    displayPages,
    totalPage,
  } = usePagination(totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
        )}
        {displayPages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={handlePageChange(pageNumber)}
              className={cn(
                "cursor-pointer hover:bg-gray-100",
                pageNumber === currentPage && "bg-gray-200 text-black",
              )}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        {currentPage < 9 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
