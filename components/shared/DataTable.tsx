"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  Printer,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  filterOptions?: { label: string; value: string }[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  filterLabel?: string;
  pageSize?: number;
  emptyMessage?: string;
  actions?: React.ReactNode;
  enableExport?: boolean;
  exportFilename?: string;
  enablePrint?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchQuery,
  onSearchChange,
  filterOptions,
  selectedFilter,
  onFilterChange,
  filterLabel = "Filter",
  pageSize = 10,
  emptyMessage = "No matching records found.",
  actions,
  enableExport = true,
  exportFilename = "school-records",
  enablePrint = true,
}: DataTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState("");
  const [internalPage, setInternalPage] = useState(1);
  const [internalFilter, setInternalFilter] = useState("all");

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const handleSearchChange = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    else setInternalSearch(val);
    setInternalPage(1);
  };

  const filter = selectedFilter !== undefined ? selectedFilter : internalFilter;
  const handleFilterChange = (val: string) => {
    if (onFilterChange) onFilterChange(val);
    else setInternalFilter(val);
    setInternalPage(1);
  };

  // CSV Export Generator
  const handleExportCSV = () => {
    const exportableCols = columns.filter(
      (c) => c.header && c.header.toLowerCase() !== "actions" && c.header.toLowerCase() !== "action"
    );
    const headers = exportableCols.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(",");

    const rows = data.map((item) =>
      exportableCols
        .map((col) => {
          let val = "";
          if (col.accessorKey && item[col.accessorKey] !== undefined) {
            val = String(item[col.accessorKey]);
          } else {
            // Try normalized header property lookup
            const normKey = col.header.toLowerCase().replace(/[^a-z0-9]/g, "") as keyof T;
            if (item[normKey] !== undefined) {
              val = String(item[normKey]);
            }
          }
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${exportFilename}-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Pagination calculation
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const currentPage = Math.min(internalPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Top Toolbar */}
      <div className="p-5 lg:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--card-bg)] no-print">
        <div className="flex flex-1 items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 text-base bg-[var(--card-subtle)] rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all font-medium"
            />
          </div>

          {/* Filter Dropdown */}
          {filterOptions && filterOptions.length > 0 && (
            <div className="relative flex items-center">
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="pl-4 pr-10 py-3 text-base bg-[var(--card-subtle)] rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)] text-[var(--text-main)] cursor-pointer font-bold transition-all shadow-2xs"
              >
                <option value="all">All {filterLabel}</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action & Utility Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {enableExport && (
            <button
              onClick={handleExportCSV}
              type="button"
              title="Export records to CSV / Excel"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] text-sm font-bold text-[var(--text-main)] transition-all cursor-pointer shadow-2xs group"
            >
              <Download className="w-4 h-4 text-[var(--primary)] group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          )}

          {enablePrint && (
            <button
              onClick={handlePrint}
              type="button"
              title="Print Table Roster"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] text-sm font-bold text-[var(--text-main)] transition-all cursor-pointer shadow-2xs group"
            >
              <Printer className="w-4 h-4 text-[var(--primary)] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline">Print Sheet</span>
            </button>
          )}

          {actions}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--card-subtle)] border-b border-[var(--border-color)] text-sm font-black text-[var(--text-muted)] uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className={cn("py-4.5 px-5", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)] text-base text-[var(--text-main)]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id ?? rowIdx}
                  className="hover:bg-[var(--primary-light)] transition-colors duration-150 group"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={cn("py-4.5 px-5 text-base font-medium", col.className)}>
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String(row[col.accessorKey] ?? "")
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-[var(--text-muted)] text-base font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-5 lg:p-6 border-t border-[var(--border-color)] flex items-center justify-between bg-[var(--card-bg)] text-base text-[var(--text-muted)]">
        <div>
          Showing{" "}
          <span className="font-bold text-[var(--text-main)]">
            {data.length === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-[var(--text-main)]">
            {Math.min(startIndex + pageSize, data.length)}
          </span>{" "}
          of <span className="font-bold text-[var(--text-main)]">{data.length}</span> entries
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setInternalPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--text-main)] cursor-pointer transition-all shadow-2xs"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-3 font-bold text-sm sm:text-base text-[var(--text-main)]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setInternalPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--text-main)] cursor-pointer transition-all shadow-2xs"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
