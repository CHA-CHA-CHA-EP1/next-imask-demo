"use client";
import { Stack, Button, Typography, Input, Box } from "@mui/joy";
import { useForm } from "react-hook-form";
import { z  } from 'zod';
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormValues = {
  firstname: string;
  laserCode: string;
}

const schema = z.object({
  firstname: z.string()
    .min(1, "fristname is required"),
  laserCode: z.string()
    .min(1, "laser code is required"),
});

export default function Page() {
  const { register, watch, control, formState, getValues} = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      laserCode: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { errors, isDirty, isValid } = formState;

  console.log('version 18')

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
          <Box>
            <Typography level="title-lg">firstname: {watch('firstname')}</Typography> 
            <Input 
              placeholder="firstname"
              size="lg"
              { ...register("firstname") }
              type="text"
              error={!!errors.firstname}
              slotProps={{
                input: {
                  onInput: (e: any) => {
                    if (e.currentTarget.value.length > 12) {
                      e.target.value = getValues("firstname");
                      return;
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
          </Box>
          <Box>
            <Typography level="title-lg">laserCode: {watch('laserCode')}</Typography> 
            <Input 
              placeholder="laserCode"
              size="lg"
              { ...register("laserCode") }
              type="text"
              error={!!errors.laserCode}
              slotProps={{
                input: {
                  onInput: (e: any) => {
                    const oldValue = getValues("laserCode");
                    const value = e.currentTarget.value;
                    
                    if (value.length > 12) {
                      e.currentTarget.value = oldValue;
                      return;
                    }
                    
                    if (value.length <= 2) {
                      e.currentTarget.value = value.replace(/[^A-Z]/g, '');
                    } else {
                      const newValue = value.replace(/[^A-Z0-9]/g, '');
                      if (!/^[A-Z]{2}[0-9]*$/.test(newValue)) {
                        e.currentTarget.value = oldValue;
                      } else {
                        e.currentTarget.value = newValue;
                      }
                    }
                  },
                  maxLength: 12
                }
              }}
            />
            { errors.laserCode && (
              <Typography sx={{color: 'red', margin: 0, padding: 0}}>{errors.laserCode.message}</Typography>
            )}
          </Box>
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
