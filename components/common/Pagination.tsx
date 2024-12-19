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
  return (
    <div className="my-10 mb-20">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/${type}?page=${page - 1}`}
              // disabled={page === 1}
            />
          </PaginationItem>

          {page > 2 && (
            <PaginationItem>
              <PaginationLink href={`/${type}?page=1`}>1</PaginationLink>
            </PaginationItem>
          )}

          {
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationLink href={`/${type}?page=${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href={`/${type}?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href={`/${type}?page=${page + 1}`}
              // disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
