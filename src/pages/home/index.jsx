import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useAllTodos } from "@/hooks/todos";
import { usePagination } from "@/hooks/use-pagination";

import { ContentLoader } from "@/components/common/loader";
import { SearchInput } from "./search";
import TodoCard from "./todo-card";
import { AddTodo } from "./add-todo";
import { FilterTodo } from "./filter-todo";

export default function Home() {
  const { data: todosData, isLoading, isStale } = useAllTodos();

  const {
    currentPage,
    totalPages,
    currentData: paginatedData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    getPageNumbers,
  } = usePagination({
    data: todosData,
    itemsPerPage: 10,
  });

  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("title");
  const filterValue = searchParams.get("filter");

  const isPending = !paginatedData || isLoading || isStale || !todosData;

  const pageNumbers = getPageNumbers();
  const showStartEllipsis = pageNumbers[0] > 1;
  const showEndEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  const filteredData = useMemo(() => {
    let result = paginatedData;

    if (filterValue) {
      if (filterValue === "complete") {
        result = result.filter((data) => {
          return data.completed === true;
        });
      } else if (filterValue === "incomplete") {
        result = result.filter((data) => {
          return data.completed === false;
        });
      } else {
        result = result.filter(() => {
          return result;
        });
      }
    }

    if (searchTitle && searchTitle.length > 0) {
      result = result.filter((data) => {
        return data.title.includes(searchTitle);
      });
    }

    return result;
  }, [paginatedData, searchTitle, filterValue]);

  return (
    <main className="border border-black min-h-[100vh] px-4 py-10">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-4xl text-center">TODO APP</h1>

        <p className="text-muted-foreground mt-4">
          Showing {filteredData?.length} of {todosData?.length} tasks (Page{" "}
          {currentPage} of {totalPages})
        </p>
      </div>

      <Link
        to={`/oore`}
        className="inline-block min-w-[80px] text-center text-[.8rem] p-3  mt-4 rounded-[20px] bg-neon-navy text-mother-of-pearl"
      >
        Test Error Boundary
      </Link>

      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 flex-wrap">
        <SearchInput />

        <div className="flex items-center justify-start gap-2">
          <FilterTodo />
          <AddTodo />
        </div>
      </div>

      {isPending ? (
        <ContentLoader />
      ) : filteredData?.length === 0 ? (
        <div className="min-h-[50vh] w-full text-3xl flex items-center justify-center font-extrabold">
          No Data Available
        </div>
      ) : (
        <>
          {/* Data Display */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {filteredData.map((todo, index) => (
              <TodoCard todo={todo} key={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToPreviousPage();
                    }}
                    className={
                      !canGoToPreviousPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {showStartEllipsis && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(1);
                        }}
                        className={
                          1 === currentPage
                            ? "bg-[#16243d] text-[#e9dccb] hover:bg-[#16243d] hover:text-[#e9dccb]"
                            : ""
                        }
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {pageNumbers.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(page);
                      }}
                      isActive={page === currentPage}
                      className={
                        page === currentPage
                          ? "bg-[#16243d] text-[#e9dccb] hover:bg-[#16243d] hover:text-[#e9dccb]"
                          : ""
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {showEndEllipsis && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(totalPages);
                        }}
                        className={
                          totalPages === currentPage
                            ? "bg-[#16243d] text-[#e9dccb] hover:bg-[#16243d] hover:text-[#e9dccb]"
                            : ""
                        }
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToNextPage();
                    }}
                    className={
                      !canGoToNextPage ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </main>
  );
}
