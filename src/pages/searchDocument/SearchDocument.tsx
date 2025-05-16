import { SearchDocumentCard } from "../../components/cards/SearchDocumentCard";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getDocuments } from "../../layout/dashboard/Dashboard.service";
import { useAuthStore } from "../../store/auth.store";

export const SearchDocument = () => {
  const user_name = useAuthStore((state) => state.userName);
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
    const payload: any = {
      major_head: filters.major_head || "",
      minor_head: filters.minor_head || "",
      from_date: filters.from_date,
      to_date: filters.to_date,
      uploaded_by: user_name,
      start: 0,
      length: 10,
    };

    // include tags if not empty
    if (filters.tags && filters.tags.length > 0) {
      payload.tags = filters.tags.map((tag: string) => ({
        tag_name: tag,
      }));
    }

    // include filterId if it exists
    if (filters.filterId) {
      payload.filterId = filters.filterId;
    }

    searchDocuments(payload);
  };

  return (
    <>
      <SearchDocumentCard onSearch={onSearch} />
      {error && <p style={{ color: "red" }}>Something went wrong</p>}
     {documents && documents.length===0 && <p>No documents found</p>}
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
