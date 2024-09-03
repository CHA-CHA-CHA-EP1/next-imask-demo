"use client";
import { Stack, Button, Typography, Input } from "@mui/joy";
import { useForm } from "react-hook-form";
import { z  } from 'zod';
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormValues = {
  firstname: string;
}

const schema = z.object({
  firstname: z.string()
    .min(1, "fristname is required")
});

export default function Page() {
  const { register, watch, control, formState} = useForm<FormValues>({
    defaultValues: {
      firstname: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { errors, isDirty, isValid } = formState;

  console.log('version 10')

  return (
    <Stack
      padding={2}
      textAlign="left"
      sx={{
        paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
      }}
      spacing={2}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack spacing={2}>
          <Typography level="title-lg">LaserCode: {watch('firstname')}</Typography> 
          <Input 
            placeholder="Laser Code"
            size="lg"
            { ...register("firstname") }
            type="text"
            error={!!errors.firstname}
            slotProps={{
              input: {
                onInput: (e: any) => {
                  console.log('onInput', e.currentTarget.value)
                  if (e.currentTarget.value.length > 12) {
                    //e.currentTarget.value = e.currentTarget.value.slice(0, 12);
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    e.nativeEvent.preventDefault();
                    e.nativeEvent.stopPropagation();
                    e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
                  }
                  const value = e.currentTarget.value;
                  const newValue = value.replace(/[^ก-๙0-9(). -]/g, '');
                  e.currentTarget.value = newValue;
                },
                maxLength: 12
              }
            }}
          />
          { errors.firstname && (
            <Typography sx={{color: 'red', margin: 0, padding: 0}}>{errors.firstname.message}</Typography>
          )}
          <DevTool 
            control={control} 
          />
          <Button
              type="submit"
              fullWidth={true}
              disabled={!isDirty || !isValid}
            >
              Next
          </Button>
        </Stack>
      </form>
      </Stack>  
  )
}
