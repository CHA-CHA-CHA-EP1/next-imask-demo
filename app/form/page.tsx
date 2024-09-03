"use client";
import { Stack, Button, Typography, Input } from "@mui/joy";
import { useForm } from "react-hook-form";
import { z  } from 'zod';
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormValues = {
  laserCode: string;
}

const schema = z.object({
  laserCode: z.string()
    .min(12, "Laser code is required")
});

export default function Page() {
  const { register, watch, control, formState} = useForm<FormValues>({
    defaultValues: {
      laserCode: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { errors, isDirty, isValid } = formState;

  console.log('version 4')

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
          <Typography level="title-lg">LaserCode: {watch('laserCode')}</Typography> 
          <Input 
            placeholder="Laser Code"
            size="lg"
            { ...register("laserCode") }
            error={!!errors.laserCode}
            slotProps={{
              input: {
                onInput: (e) => {

                  if (e.currentTarget.value.length > 12) {
                    console.log('preventDefault');
                    e.preventDefault();
                  }

                  const value = e.currentTarget.value;
                  console.log(value);
                  const newValue = value.replace(/[^ก-๙0-9(). -]/g, '');
                  e.currentTarget.value = newValue;
                },
                maxLength: 12
              }
            }}
          />
          { errors.laserCode && (
            <Typography sx={{color: 'red', margin: 0, padding: 0}}>{errors.laserCode.message}</Typography>
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
