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
      laserCode: "",
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
      textAlign="left"
      sx={{
        paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
      }}
      spacing={2}
    >
    <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      </div>
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
                    let value = e.currentTarget.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
                    let tempValue = '';

                    for (let i = 0; i < value.length; i++ ) {
                      if (tempValue.length <= 1){
                        if (value[i].match(/[A-Za-z]/)) {
                          tempValue += value[i];
                        }
                        continue;
                      }
                      if (value[i].match(/[0-9]/)) {
                        tempValue += value[i];
                      }
                    }
                    if (tempValue.length > 12) {
                      tempValue = tempValue.slice(0, 12);
                      e.target.value = tempValue;
                      return;
                    }

                    e.currentTarget.value = tempValue;
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
