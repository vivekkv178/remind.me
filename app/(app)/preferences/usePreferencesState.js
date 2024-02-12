import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import { toast } from "@/components/UI/use-toast";
import { API_ENDPOINTS } from "@/lib/urls";

const FormSchema = z.object({
  touchpoints: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

const usePreferencesState = () => {
  const [userPreferences, setUserPreferences] = useState(null);

  const authReducerState = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      touchpoints: [],
    },
  });

  useEffect(() => {
    if (authReducerState?.user) {
      setUserPreferences(authReducerState?.user?.userPreferences);
      form.setValue(
        "touchpoints",
        authReducerState?.user?.userPreferences?.preferences?.touchpoints
      );
    }
  }, [authReducerState?.user]);

  const onSubmit = async (data) => {
    console.log(data);
    axios
      .post(API_ENDPOINTS.ADD_SUBSCRIBER, {
        email: authReducerState?.user?.email,
        preferences: { touchpoints: data?.touchpoints },
      })
      .then(function (response) {
        toast({
          title: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return { userPreferences, onSubmit, form };
};

export default usePreferencesState;
