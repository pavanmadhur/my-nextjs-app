"use client";
import { useTable, useSortBy, usePagination } from "react-table";
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
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
  const handleDownloadSuccess = () => {
    toast.success("CSV downloaded successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

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
  const handleDelete = async (id, event) => {
    if (event) {
        event.stopPropagation(); // Prevent the event from bubbling up
    }
    
    if (!window.confirm("Are you sure you want to delete this contact?")) {
        return;
    }

    try {
        const token = localStorage.getItem("auth");

        if (!token) {
            alert("Authorization token not found. Please log in again.");
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/v1/contacts/deletecontact/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            setUserdata((prev) => prev.filter((contact) => contact._id !== id));
            alert("Contact deleted successfully!");
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
        alert("Failed to delete contact. Please try again.");
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
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <Trash
            style={{
              color: "red",
              cursor: "pointer",
              fontSize: "10px",
            }}
            onClick={() => handleDelete(row.original._id)} // Pass contact ID to delete
          />
        ),
      },
    ],
    []
  );
  
  const {
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
      initialState: { pageSize: 7 },
    },
    useSortBy,
    usePagination
  );
  
  return ( 
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "linear-gradient(to right, #003973, #0074d9)", // Gradient background
        fontWeight: "bold",
        boxShadow: "0 3px 9px rgba(0, 0, 0, 0.1)", // Shadow effect
        color: "white",
        width: "98%",
        zIndex: 200,
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
      <section
      id="ContactUsersTable"
      style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}
    >
       <h1
        className="text-center font-bold"
        style={{
          fontSize: "28px",
          lineHeight: "1.2",
          color: "#000",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Contact Users Table
      </h1>
        {loading ? (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #4a90e2",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
        ) : userdata.length === 0 ? (
          <div
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          No data available
        </div>
        ) : (
          <div
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "24px",
            margin: "0 auto",
            maxWidth: "1200px",
          }}
        >
            {/* Table Header */}
            <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <CSVLink
              data={userdata}
              headers={headers}
              filename="ContactUsers.csv"
              className="px-4 py-2"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={handleDownloadSuccess}
            >
              Download CSV
            </CSVLink>
          </div>
  
            {/* Table */}
            <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
  {headerGroups.map((headerGroup, headerGroupIndex) => (
    <tr
      {...headerGroup.getHeaderGroupProps()}
      key={`header-group-${headerGroupIndex}`}
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {headerGroup.headers.map((column, columnIndex) => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          key={`column-${columnIndex}`}
          style={{
            padding: "12px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#4a90e2",
            borderBottom: "2px solid #e5e7eb",
          }}
        >
          {column.render("Header")}
          <span style={{ marginLeft: "8px" }}>
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

<tbody>
  {page.map((row, rowIndex) => {
    prepareRow(row);
    return (
      <tr
        {...row.getRowProps()}
        key={`row-${row.original.id || rowIndex}`} // Use a unique value (e.g., `id`) or fallback to `rowIndex`
        style={{
          backgroundColor: "#fff",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#f9fafb")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#fff")
        }
      >
        {row.cells.map((cell, cellIndex) => (
          <td
            {...cell.getCellProps()}
            key={`cell-${rowIndex}-${cellIndex}`} // Combine row and cell indices if no unique ID is available
            style={{
              padding: "12px",
              fontSize: "14px",
              color: "#4a4a4a",
              borderBottom: "1px solid #e5e7eb",
            }}
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
        </div>
      )}
    </section>
            {/* Pagination */}
            <div className="flex flex-col items-center mt-6"
            style={{
              textAlign: "center",
            }}>
  <div className="text-sm text-gray-500 mb-4">
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
  );
}
