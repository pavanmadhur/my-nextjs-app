"use client";
import { useTable, useSortBy, usePagination } from "react-table";
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSVLink } from "react-csv";
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
            "Content-Type": "application/json", // Ensure JSON header is set
          },
        }
      );
  
      if (response.status === 204) {
        // Handle case when there's no content returned
        console.log("No content returned");
        setUserdata([]); // Optionally set empty data
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const res = await response.json();
      console.log("API Response:", res); // Debug API response
  
      if (res.success && Array.isArray(res.contacts)) {
        setUserdata(res.contacts);
        setLoading(false); // Set loading to false after data is fetched
      } else {
        console.error("Invalid data:", res);
        localStorage.removeItem("auth");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false); // Ensure loading is set to false even in case of error
    }
  };
  
   
  



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
    <div className="flex flex-col w-full p-4 mt-10">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : userdata.length === 0 ? (
        <div className="flex m-auto font-serif">No data is available</div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <CSVLink
              data={userdata}
              filename="ContactUsers.csv"
              headers={headers}
            >
              <button className="bg-orange-500 font-serif text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Download CSV
              </button>
            </CSVLink>
          </div>
          <div className="overflow-auto">
            <table
              className="table-auto w-full border-collapse border border-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-100">
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, colIndex) => (
                      <th
                        key={colIndex}
                        className="border font-serif border-gray-200 px-4 py-2 text-left"
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render("Header")}
                        <span>
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
              <tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          className="border font-serif border-gray-200 px-4 py-2"
                          {...cell.getCellProps()}
                          key={cellIndex}
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
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={nextPage}
              disabled={!canNextPage}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );

}
