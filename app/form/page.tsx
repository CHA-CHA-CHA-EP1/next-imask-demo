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
    .regex(/^[0-9]{12}$/, "Laser code must be 12 digits")
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
                onKeyDown: (e) => {
                  if (e.key === "A" || e.key === "a" || e.key === "ก") {
                    e.preventDefault();
                  }
                }
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
