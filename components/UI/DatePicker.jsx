"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { Calendar } from "@/components/UI/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";

const formatCaption = (month, options) => {
  return <>{format(month, "LLLL", { locale: options?.locale })}</>;
};

export function DatePicker(props) {
  const { onDateSelect, showMonthsOnly, formatStr = "PPP" } = props;
  const [date, setDate] = useState();
  const [openDate, setOpenDate] = useState(false);

  const dateSelectHandler = (selectedDate) => {
    setDate(selectedDate);
    setOpenDate(false);
    if (onDateSelect) onDateSelect(selectedDate);
  };

  useEffect(() => {
    if (props?.date) setDate(props?.date?.seconds * 1000 || props?.date);
  }, [props?.date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpenDate(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatStr) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={dateSelectHandler}
          initialFocus
          formatters={showMonthsOnly ? { formatCaption } : null}
        />
      </PopoverContent>
    </Popover>
  );
}
