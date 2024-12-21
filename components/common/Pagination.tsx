import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationComponent = ({
  type,
  page = 1,
  totalPages = 10,
}: {
  type: string;
  page: number;
  totalPages: number;
}) => {
  const currentPage = Number(page);

  const getPageNumbers = () => {
    const delta = 0;
    const range = [];
    const rangeWithDots = [];

    rangeWithDots.push(1);

    if (currentPage - delta > 2) {
      rangeWithDots.push("...");
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }
    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="my-10 mb-20">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/${type}?page=${currentPage - 1}`}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          {getPageNumbers().map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={`/${type}?page=${pageNum}`}
                  className={
                    pageNum === currentPage
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  aria-current={pageNum === currentPage ? "page" : undefined}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={`/${type}?page=${currentPage + 1}`}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
