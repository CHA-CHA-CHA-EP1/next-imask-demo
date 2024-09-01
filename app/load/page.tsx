'use client';
import { Box, Stack, Typography, Button } from '@mui/joy';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';

export default function Page() {
  return (
    <Stack
      gap={2}
      spacing={2}
    >
      <Box>
        <Link
          href="/load/page1"
        >
          <Suspense fallback={<>Loading...</>}>
          <Button fullWidth={true}>Loading Page </Button>
          </Suspense>
        </Link> 
      </Box>
    </Stack>
  );
}
