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
  const { register, watch, control, formState, getValues, setValue, trigger, reset, clearErrors} = useForm<FormValues>({
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

  useEffect(() => {
    // visibilitychange
    // const handleVisibilityChange = () => {
    //   console.log('on visiblity change');
    //   const inputs = document.querySelectorAll("input");
    //   inputs.forEach((input) => {
    //     if (document.activeElement === input) {
    //       input.blur();
    //     }
    //   });
    // }
    
    const handleViewportResize = () => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        if (document.activeElement === input) {
           const visualViewportHeight = window?.visualViewport?.height;
           const actualHeight = window.innerHeight;
           if (visualViewportHeight === actualHeight) {
             input.blur();
           }
        }
      });
    }

    window?.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => {
      window?.visualViewport?.removeEventListener("resize", handleViewportResize);
    }
  }, [])

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
              onFocus={() => {
                clearErrors("firstname");
              }}
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
              onBlur={(e: any) => {
                console.log(e.relatedTarget);
                const btnId = e.relatedTarget?.id;
                if (btnId === "btn-clear") {
                  return;
                }

                trigger("laserCode");

                if (getValues("laserCode").length < 12) {
                  return;
                }
                setValue("laserCode", formatLaserCode(getValues("laserCode")));
                setShowClearButton(false);
              }}
              onFocus={() => {
                setValue("laserCode", getValues("laserCode").replace(/\s/g, ''));
                setShowClearButton(true);
              }}
              endDecorator={showClearButton && (
                <Button
                  type="button"
                  id="btn-clear"
                  onClick={() => {
                    // setValue("laserCode", "");
                    console.log('click')
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
                    const regex = /^([A-Z]{0,2})(.*)/;

                    if (value.length <= 2) {
                      e.currentTarget.value = value.replace(
                        /[^A-Za-z]/g,
                        "",
                      );
                      return;
                    }

                    console.log(value);

                    const match =regex.exec(value); 

                    console.log(match);
                    if (match !== null) {
                        let firstTwoChars = match[1];  // กลุ่มที่ 1 จับตัวอักษร 2 ตัวแรก
                        let rest = match[2];           // กลุ่มที่ 2 จับส่วนที่เหลือหลังตัวอักษร 2 ตัวแรก

                        let onlyNumbers = rest.replace(/[^0-9]/g, '');

                        let result = firstTwoChars + onlyNumbers;

                        if (result.length > 12) {
                            result = result.substring(0, 12);  // ตัดความยาวเกิน 12 ตัวออก
                        }

                        e.target.value = result;
                    }
                  },
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
