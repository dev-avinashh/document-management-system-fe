import {
  Button,
  Card,
  FileInput,
  Select,
  Textarea,
  MultiSelect,
  Group,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import {
  getTags,
  uploadDocument,
} from "../../pages/dashboard/Dashboard.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ITag } from "../../pages/dashboard/Dashboard.interface";
import { notifications } from "@mantine/notifications";
import { formatDate } from "../../utils/main";
import { useAuthStore } from "../../store/auth.store";

export const UploadDocument = () => {
  const userId = useAuthStore((state) => state.userId);

  const [majorHead, setMajorHead] = useState<string | null>("");
  const [minorHead, setMinorHead] = useState<string | null>("");
  const [minorHeadOptions, setMinorHeadOptions] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [remarks, setRemarks] = useState("");
  const [documentDate, setDocumentDate] = useState<Date | null>(null);
  // for testing
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (majorHead === "Personal") {
      setMinorHeadOptions(["John", "Tom", "Emily"]);
    } else if (majorHead === "Professional") {
      setMinorHeadOptions(["HR", "Finance", "IT", "Accounts"]);
    } else {
      setMinorHeadOptions([]);
    }
    setMinorHead("");
  }, [majorHead]);

  const {
    data: tagsData = [],
    isLoading,
    isError,
  } = useQuery<ITag[]>({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  const tagOptions = tagsData.map((tag: ITag) => ({
    label: tag.label,
    value: tag.id,
  }));

  // handling file upload
  const fileSubmitHandler = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Document uploaded successfully!",
        color: "green",
      });
      // Reset fields
      setFile(null);
      setMajorHead("");
      setMinorHead("");
      setDocumentDate(null);
      setRemarks("");
      setSelectedTags([]);
    },
    onError: (error: any) => {
      notifications.show({
        title: "Upload Failed",
        message: error?.response?.data?.message || "Something went wrong.",
        color: "red",
      });
    },
  });

  const handleSubmit = () => {
    if (!file || !majorHead || !minorHead || !documentDate) {
      return notifications.show({
        title: "Missing fields",
        message: "Please fill all required fields.",
        color: "red",
      });
    }

    const formattedDate = formatDate(documentDate);

    const payload:any = {
      major_head: majorHead,
      minor_head: minorHead,
      document_date: formattedDate,
      document_remarks: remarks,
      // tags: selectedTags.map((tag) => ({ tag_name: tag })),
      user_id: userId,
    };

    if (selectedTags && selectedTags.length > 0) {
      payload.tags = selectedTags.map((tag: string) => ({
        tag_name: tag,
      }));
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(payload));

    fileSubmitHandler.mutate(formData);
  };

  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Stack>
        <DateInput
          label="Document Date"
          placeholder="Pick date"
          value={documentDate}
          onChange={setDocumentDate}
          required
        />

        <Select
          label="Category"
          placeholder="Select Major Head"
          data={["Personal", "Professional"]}
          value={majorHead}
          onChange={setMajorHead}
          required
        />

        <Select
          label={majorHead === "Personal" ? "Name" : "Department"}
          placeholder="Select Minor Head"
          data={minorHeadOptions}
          value={minorHead}
          onChange={setMinorHead}
          required
          disabled={!majorHead} // Disable until major head is selected
        />

        <MultiSelect
          label="Tags"
          placeholder={
            isLoading
              ? "Loading..."
              : isError
              ? "Failed to load tags"
              : "Select or create tags"
          }
          data={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          creatable
          getCreateLabel={(query) => `+ Create "${query}"`}
          onCreate={(query) => {
            setSelectedTags((prev) => [...prev, query]);
            return query;
          }}
        />

        <Textarea
          label="Remarks"
          placeholder="Enter remarks"
          value={remarks}
          onChange={(event) => setRemarks(event.currentTarget.value)}
        />

        <FileInput
          label="Upload Document"
          accept="application/pdf,image/*"
          value={file}
          onChange={setFile}
          required
        />

        <Group>
          <Button onClick={handleSubmit}>Upload</Button>
        </Group>
      </Stack>
    </Card>
  );
};
