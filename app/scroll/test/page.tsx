"use client";
import { Button } from '@mui/joy';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Test Page</h1>
      <Button
        onClick={() => {
          router.replace("/scroll");
        }}
      ></Button>
    </>
  )
}
