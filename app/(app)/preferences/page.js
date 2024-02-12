"use client";

import { Button } from "@/components/UI/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Checkbox } from "@/components/UI/Checkbox";
import usePreferencesState from "./usePreferencesState";

const touchpoints = [
  {
    id: "email",
    label: "Email",
  },
  {
    id: "push",
    label: "Push Notifications",
    disabled: true,
  },
];

export default function ProfileForm() {
  const preferencesState = usePreferencesState();
  const { form } = preferencesState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(preferencesState?.onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="touchpoints"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Notifications</FormLabel>
                <FormDescription>
                  Select the notification channel.
                </FormDescription>
              </div>
              {touchpoints.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="touchpoints"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            disabled={item.disabled}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
