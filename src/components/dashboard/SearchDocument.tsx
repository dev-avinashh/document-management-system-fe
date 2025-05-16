import { SearchDocumentCard } from "../cards/SearchDocumentCard";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getDocuments } from "../../pages/dashboard/Dashboard.service";

export const SearchDocument = () => {
  const [documents, setDocuments] = useState([]);

  const { mutate: searchDocuments, error } = useMutation({
    mutationFn: getDocuments,
    onSuccess: (data) => {
      console.log("Search results:", data);
      setDocuments(data);
    },
    onError: (err) => {
      console.error("Search failed:", err);
    },
  });

  const onSearch = (filters: any) => {
    const payload = {
      major_head: filters.major_head || "",
      minor_head: filters.minor_head || "",
      from_date: filters.from_date, 
      to_date: filters.to_date,
      tags: filters.tags,
      uploaded_by: "test_avinash", 
      start: 0,
      length: 10,
      filterId: filters.filterId,
      search: filters.search || "",
    };

    searchDocuments(payload);
  };

  return (
    <>
      <SearchDocumentCard onSearch={onSearch} />
      {error && <p style={{ color: "red" }}>Something went wrong</p>}
      {documents && documents.length > 0 && (
        <ul>
          {documents.map((doc: any, index: number) => (
            <li key={index}>{doc.document_name || "Unnamed Document"}</li>
          ))}
        </ul>
      )}
    </>
  );
};
