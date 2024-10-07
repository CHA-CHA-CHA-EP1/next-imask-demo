'use client';
import { Stack, Button, Typography, Input } from "@mui/joy";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaserCodeMaskAdapter, RegexMaskAdapter, RegexMaskAdapter2 } from "@/src/imask";

export type FormValues = {
  laserCode: string;
  firstname: string;
  lastname: string;
  firstname2: string;
}

const schema = z.object({
  laserCode: z.string().min(12, "Laser code is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  firstname2: z.string().min(1, "First name is required"),
});

export default function Page() {
  const { register, handleSubmit, formState: { isDirty, isValid}, control, watch } = useForm<FormValues>({
    defaultValues: {
      laserCode: "",
      firstname: "สวัสดีเมือง",
      lastname: "ไทย",
      firstname2: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <Stack
      padding={2}
      textAlign="left"
      sx={{
        paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
      }}
      spacing={2}
    >
      <Typography level="title-lg">Version. 0.0.2</Typography>
      <Typography level="title-lg">Form</Typography>

      <Stack
        spacing={2}
      >
        <Typography level="title-lg">Laser Code: {watch('laserCode')}</Typography>
        <Controller
          name="laserCode"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Laser Code"
              size="lg"
              {...field}
              sx={{
                "& input": {
                  color: "#0B0D0E",
                },
              }}
              slotProps={{
                input: {
                  component: LaserCodeMaskAdapter,
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  autofix: false,
                  autoComplete: "off",
                  spellCheck: false,
                },
              }}
            />
          )}
        />
      </Stack>

      <Stack
        spacing={2}
      >
        <Typography level="title-lg">Firstname: {watch('firstname')}</Typography>
        <Controller
          name="firstname"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="ชื่อ"
              size="lg"
              {...field}
              sx={{
                "& input": {
                  color: "#0B0D0E",
                },
              }}
              slotProps={{
                input: {
                  component: RegexMaskAdapter,
                  mask: "^[ก-๙0-9(). -]{0,40}$",
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  autofix: false,
                  autoComplete: "off",
                  spellCheck: false,
                  maxLength: 40,
                },
              }}
            />
          )}
        />
      </Stack>
      
      <Stack
        spacing={2}
      >
        <Typography level="title-lg">Lastname: {watch('lastname')}</Typography>
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="นามสกุล"
              size="lg"
              {...field}
              sx={{
                "& input": {
                  color: "#0B0D0E",
                },
              }}
              slotProps={{
                input: {
                  component: RegexMaskAdapter,
                  mask: "^[ก-๙0-9(). -]{0,40}$",
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  autofix: false,
                  autoComplete: "off",
                  spellCheck: false,
                  maxLength: 40,
                },
              }}
            />
          )}
        />
      </Stack>

      <Stack
        spacing={2}
      >
        <Typography level="title-lg">Firstname2: {watch('firstname2')}</Typography>
        <Controller
          name="firstname2"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="ชื่อ2"
              size="lg"
              {...field}
              sx={{
                "& input": {
                  color: "#0B0D0E",
                },
              }}
              slotProps={{
                input: {
                  component: RegexMaskAdapter2,
                  mask: "^[ก-๙0-9(). -]{0,40}$",
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  autofix: false,
                  autoComplete: "off",
                  spellCheck: false,
                  maxLength: 40,
                },
              }}
            />
          )}
        />
      </Stack>

      <Button
        onClick={handleSubmit((data) => {
          alert(JSON.stringify(data, null, 2));
        })}
        disabled={!isDirty || !isValid}
      >Submit</Button>
    </Stack>
  );
}
