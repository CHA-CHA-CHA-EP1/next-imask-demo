import { Button, Input, Stack } from '@mui/joy';

export default function Page() {
  return (
    <>
      <Stack
        gap={2}
        spacing={2}
      >
        <Input placeholder="Placeholder" />
        <Input placeholder="Placeholder" />
        <Button>NEXT</Button>
      </Stack>
    </>
  )
}
