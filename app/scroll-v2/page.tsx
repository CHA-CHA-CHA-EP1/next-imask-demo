"use client";
import { Stack, Button, Typography, Input } from "@mui/joy";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LaserCodeMaskAdapter,
  RegexMaskAdapter,
  RegexMaskAdapter2,
} from "@/src/imask";

export type FormValues = {
  laserCode: string;
  firstname: string;
  lastname: string;
  firstname2: string;
  firstname3: string;
  firstname4: string;
  firstname5: string;
  firstname6: string;
  firstname7: string;
  firstname8: string;
  firstname9: string;
  firstname10: string;
  firstname11: string;
  firstname12: string;
  firstname13: string;
  firstname14: string;
  firstname15: string;
  firstname16: string;
  firstname17: string;
  firstname18: string;
  firstname19: string;
  firstname20: string;
  firstname21: string;
  firstname22: string;
};

const schema = z.object({
  laserCode: z.string().min(12, "Laser code is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  firstname2: z.string().min(1, "First name is required"),
  firstname3: z.string().min(1, "First name 3 is required"),
  firstname4: z.string().min(1, "First name 4 is required"),
  firstname5: z.string().min(1, "First name 5 is required"),
  firstname6: z.string().min(1, "First name 6 is required"),
  firstname7: z.string().min(1, "First name 7 is required"),
  firstname8: z.string().min(1, "First name 8 is required"),
  firstname9: z.string().min(1, "First name 9 is required"),
  firstname10: z.string().min(1, "First name 10 is required"),
  firstname11: z.string().min(1, "First name 11 is required"),
  firstname12: z.string().min(1, "First name 12 is required"),
  firstname13: z.string().min(1, "First name 13 is required"),
  firstname14: z.string().min(1, "First name 14 is required"),
  firstname15: z.string().min(1, "First name 15 is required"),
  firstname16: z.string().min(1, "First name 16 is required"),
  firstname17: z.string().min(1, "First name 17 is required"),
  firstname18: z.string().min(1, "First name 18 is required"),
  firstname19: z.string().min(1, "First name 19 is required"),
  firstname20: z.string().min(1, "First name 20 is required"),
  firstname21: z.string().min(1, "First name 21 is required"),
  firstname22: z.string().min(1, "First name 22 is required"),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      laserCode: "",
      firstname: "สวัสดีเมือง",
      lastname: "ไทย",
      firstname2: "",
      firstname3: "",
      firstname4: "",
      firstname5: "",
      firstname6: "",
      firstname7: "",
      firstname8: "",
      firstname9: "",
      firstname10: "",
      firstname11: "",
      firstname12: "",
      firstname13: "",
      firstname14: "",
      firstname15: "",
      firstname16: "",
      firstname17: "",
      firstname18: "",
      firstname19: "",
      firstname20: "",
      firstname21: "",
      firstname22: "",
    },
    resolver: zodResolver(schema),
  });

  const firstnameFields = Array.from({ length: 20 }, (_, i) => ({
    name: `firstname${i + 3}` as keyof FormValues, // Start from firstname3
    placeholder: `ชื่อ ${i + 3}`,
  }));

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

      <Stack spacing={2}>
        <Typography level="title-lg">
          Laser Code: {watch("laserCode")}
        </Typography>
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

      <Stack spacing={2}>
        <Typography level="title-lg">
          Firstname: {watch("firstname")}
        </Typography>
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

      <Stack spacing={2}>
        <Typography level="title-lg">Lastname: {watch("lastname")}</Typography>
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

      <Stack spacing={2}>
        <Typography level="title-lg">
          Firstname2: {watch("firstname2")}
        </Typography>
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

      {/* เพิ่ม 20 ฟิลด์ firstname เพิ่มเติม */}
      {firstnameFields.map((field) => (
        <Stack spacing={2} key={field.name}>
          <Typography level="title-lg">
            {field.placeholder}: {watch(field.name)}
          </Typography>
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                placeholder={field.placeholder}
                size="lg"
                {...controllerField}
                sx={{
                  "& input": {
                    color: "#0B0D0E",
                  },
                }}
                slotProps={{
                  input: {
                    component: RegexMaskAdapter, // หรือ RegexMaskAdapter2 ถ้าต้องการ
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
      ))}

      <Button
        onClick={handleSubmit((data) => {
          alert(JSON.stringify(data, null, 2));
        })}
        disabled={!isDirty || !isValid}
      >
        Submit
      </Button>
    </Stack>
  );
}
