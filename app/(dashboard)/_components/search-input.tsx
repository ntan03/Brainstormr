"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import qs from "query-string";

export const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounceValue(value, 500);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue[0],
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search for boards"
        onChange={handleChangeValue}
      />
    </div>
  );
};
