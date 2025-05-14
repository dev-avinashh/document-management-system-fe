import { Card, Select, MultiSelect, Group, Button, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ITag } from "../../pages/dashboard/Dashboard.interface";
import { getTags } from "../../pages/dashboard/Dashboard.service";

export const SearchDocument = ({
  onSearch,
}: {
  onSearch: (filters: any) => void;
}) => {
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

  const handleSearch = () => {
    onSearch({
      majorHead,
      minorHead,
      selectedTags,
      fromDate,
      toDate,
    });
  };

  return (
    <Card withBorder padding="lg" shadow="sm">
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

        <Button onClick={handleSearch}>Search</Button>
      </Stack>
    </Card>
  );
};
