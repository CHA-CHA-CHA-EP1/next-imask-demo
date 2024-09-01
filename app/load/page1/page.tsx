"use client";
import { Button, Input, Stack, Box } from '@mui/joy';
import Link from 'next/link';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/posts',
      );
      setData(result.data);
      console.log(result.data);
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Stack
        gap={2}
        spacing={2}
      >
        <Input placeholder="Placeholder" />
        <Input placeholder="Placeholder" />
        <Input placeholder="Placeholder" />
        <Input placeholder="Placeholder" />
        <Input placeholder="Placeholder" />
        <Box>
          <Link
            href="/load/page2"
          >
            <Button fullWidth={true}>NEXT PAGE2 </Button>
          </Link> 
        </Box>
      </Stack>
    </Suspense>
  )
}
