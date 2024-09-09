"use client";
import { Stack, Button, Typography, Input, Box } from "@mui/joy";
import { useForm } from "react-hook-form";
import { z  } from 'zod';
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMask } from "react-imask";
import { useEffect, useState } from "react";

export type FormValues = {
  firstname: string;
  laserCode: string;
}

const formatLaserCode = (value: string) => {
  const maskOptions = {
    mask: "##0 0000000 00",
    definitions: {
      "#": /[A-Za-z]/,
      "0": /[0-9]/
    }
  }
  const masked = IMask.createMask(maskOptions);
  masked.value = value;
  return masked.value;
}

const schema = z.object({
  firstname: z.string()
    .min(1, "fristname is required"),
  laserCode: z.string()
    .min(1, "laser code is required")
    .regex(/^[a-zA-Z]{2}[0-9]{10}/, "Invalid laser code")
    // .transform((val) => val.replace(/\s/g, ''))
});

export default function Page() {
  const [showClearButton, setShowClearButton] = useState(false);
  const { register, watch, control, formState, getValues, setValue, trigger, reset} = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      laserCode: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { errors, isDirty, isValid } = formState;

  useEffect(() => {
    reset({
      firstname: "สวัสดีเมือง",
      laserCode: formatLaserCode("ME1122993616"),
    });
  }, [])

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
              onBlur={() => {
                console.log('onBlur');
                trigger("laserCode");

                if (getValues("laserCode").length < 12) {
                  return;
                }
                setValue("laserCode", formatLaserCode(getValues("laserCode")));
              }}
              onFocus={() => {
                setValue("laserCode", getValues("laserCode").replace(/\s/g, ''));
                setShowClearButton(true);
              }}
              endDecorator={showClearButton && (
                <Button
                  onClick={() => {
                    // setValue("laserCode", "");
                    setShowClearButton(false);
                    reset({
                      ...getValues(),
                      laserCode: ""
                    });

                    trigger("laserCode");
                  }}
                >
                  Clear
                </Button>
              )}
              slotProps={{
                input: {
                  onInput: (e: any) => {
                    const oldValue = getValues("laserCode");
                    const value = e.currentTarget.value.toUpperCase();
                    
                    if (value.length > 12) {
                      e.currentTarget.value = oldValue;
                      return;
                    }
                    
                    if (value.length <= 2) {
                      e.currentTarget.value = value.replace(/[^A-Za-z]/g, '');
                    } else {
                      const newValue = value.replace(/[^A-Za-z0-9]/g, '');
                      if (!/^[A-Za-z]{2}[0-9]*$/.test(newValue)) {
                        e.currentTarget.value = oldValue;
                      } else {
                        e.currentTarget.value = newValue;
                      }
                    }
                  },
                  maxLength: 14
                }
              }}
            />
            { errors.laserCode && (
              <Typography sx={{color: 'red', margin: 0, padding: 0}}>{errors.laserCode.message}</Typography>
            )}
          </Box>
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
