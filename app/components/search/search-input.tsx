import { useNavigate } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput({ query }: { query: string | undefined }) {
  console.log("rendering");
  const navigate = useNavigate({ from: "/search" });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex items-center gap-8"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const inputValue = inputRef.current?.value ?? "";
        await navigate({ to: "/search", search: { query: inputValue.trim() } });
      }}
    >
      <Input
        ref={inputRef}
        defaultValue={query ?? ""}
        placeholder="Search for payees"
        required
      />
      <div className="flex items-center gap-4">
        <Button variant="secondary" type="submit">
          Search
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          <XIcon />
        </Button>
      </div>
    </form>
  );
}
