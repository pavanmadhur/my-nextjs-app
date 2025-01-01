"use client";
import { useTable, useSortBy, usePagination } from "react-table";
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSVLink } from "react-csv";
import { LogOut } from "lucide-react";

const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Message", key: "message" },
  { label: "Creation Date", key: "createdAt" },
];

export default function AdminContact() {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No token found, redirecting to login");
      router.push("/admin");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/contacts/getallcontacts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized, redirecting to login");
          localStorage.removeItem("auth");
          router.push("/admin");
        } else {
          console.error(`API request failed with status: ${response.status}`);
        }
        setUserdata([]); // Clear data on error
        return;
      }
  
      const res = await response.json();
      console.log("API Response:", res);
  
      // Ensure response contains valid data
      if (res.success && Array.isArray(res.data)) {
        setUserdata(res.data);
      } else {
        console.warn("Invalid or empty response data");
        setUserdata([]); // Set empty data to avoid breaking the UI
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setUserdata([]); // Clear data on error
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };
  
  
  

  useEffect(() => {
    fetchData();
  }, []); // Ensure the API call runs only once when the component mounts
  
  const data = useMemo(() => userdata, [userdata]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (value ? value : ""),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Time",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
    ],
    []
  );
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        background: "linear-gradient(to right, #003973, #0074d9)", // Gradient background
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        color: "white",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px", // Adjusted font size for the logo
          fontWeight: "800", // Bold font weight for the logo
        }}
      >
        Admin Dashboard
      </h1>
        
      <div>
            <LogOut
              className="text-white h-8 w-8 cursor-pointer hover:text-gray-400"
              onClick={() => {
                localStorage.removeItem("auth");
                router.push("/admin");
              }}
            />
          </div>
      </header>
  
      {/* Main Section */}
      <main className="container mx-auto flex-grow px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : userdata.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 text-lg">
            No data available
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Table Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Contact Users
              </h2>
              <CSVLink
                data={userdata}
                filename="ContactUsers.csv"
                headers={headers}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
              >
                Download CSV
              </CSVLink>
            </div>
  
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-blue-100">
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, colIndex) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={colIndex}
                          className="border-b border-gray-300 px-4 py-2 text-gray-600 font-semibold text-left"
                        >
                          {column.render("Header")}
                          <span className="ml-2">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronUp size={16} />
                              )
                            ) : null}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={index}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        {row.cells.map((cell, cellIndex) => (
                          <td
                            {...cell.getCellProps()}
                            key={cellIndex}
                            className="px-4 py-2 text-gray-700"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
  
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500">
                Page {pageIndex + 1} of {pageCount}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="px-3 py-1 bg-gray-200 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
                >
                  First
                </button>
                <button
                  onClick={previousPage}
                  disabled={!canPreviousPage}
                  className="px-3 py-1 bg-gray-200 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={nextPage}
                  disabled={!canNextPage}
                  className="px-3 py-1 bg-gray-200 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className="px-3 py-1 bg-gray-200 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}  