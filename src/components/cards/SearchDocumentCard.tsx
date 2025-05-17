import { Card, Select, MultiSelect, Group, Button, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ITag } from "../../layout/dashboard/Dashboard.interface";
import { getTags } from "../../layout/dashboard/Dashboard.service";
import { formatDate } from "../../utils/main";
import { useMediaQuery } from "@mantine/hooks";

export const SearchDocumentCard = ({
  onSearch,
}: {
  onSearch: (filters: any) => void;
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 750px)");

  const [majorHead, setMajorHead] = useState<string | null>("");
  const [minorHead, setMinorHead] = useState<string | null>("");
  const [minorOptions, setMinorOptions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    if (majorHead === "Personal") {
      setMinorOptions(["John", "Tom", "Emily"]);
    } else if (majorHead === "Professional") {
      setMinorOptions(["HR", "Finance", "IT", "Accounts"]);
    } else {
      setMinorOptions([]);
    }
    setMinorHead(null);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      major_head: majorHead || "",
      minor_head: minorHead || "",
      from_date: fromDate ? formatDate(fromDate) : "",
      to_date: toDate ? formatDate(toDate) : "",
      tags: selectedTags.map((tag) => ({ tag_name: tag })),
      start: 0,
      length: 10,
      filterId: "1",
      search: { value: "" },
    };

    console.log(filters);
    onSearch(filters);
  };

  return (
    <Card
      withBorder
      padding="lg"
      shadow="sm"
      style={{
        width: isLargeScreen ? "70%" : "90%",
        margin: isLargeScreen ? "" : "0 auto",
      }}
    >
      <form onSubmit={handleSearch}>
      <Stack>
        <Select
          label="Major Head"
          placeholder="Select category"
          data={["Personal", "Professional"]}
          value={majorHead}
          onChange={setMajorHead}
        />

        <Select
          label="Minor Head"
          placeholder="Select subcategory"
          data={minorOptions}
          value={minorHead}
          onChange={setMinorHead}
          disabled={!majorHead}
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

        <Group grow>
          <DateInput
            label="From Date"
            placeholder="Start date"
            value={fromDate}
            onChange={setFromDate}
          />
          <DateInput
            label="To Date"
            placeholder="End date"
            value={toDate}
            onChange={setToDate}
          />
        </Group>

        <Group position="right" mt="md">
          <Button type="submit" >
            Search Document
          </Button>
        </Group>
      </Stack>
      </form>
    </Card>
  );
};
