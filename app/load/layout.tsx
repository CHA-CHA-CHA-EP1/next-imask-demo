import React, { Suspense } from 'react';
import { Box } from '@mui/joy';

const Layout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <header
        style={{
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: '1rem',
          width: '100%',
        }}
      >
        <h1>Header</h1>
      </header>
      <Box
        component="main"
        flexGrow={1}
        display="flex"
        width="100%"
        flexDirection="column"
        padding="1rem"
      >
        <Suspense fallback={<>Loading</>}>
          {children}
        </Suspense>
      </Box>
      <footer
        style={{
          background: 'white',
          borderTop: '1px solid #e0e0e0',
          padding: '1rem',
          width: '100%',
        }}
      >
        <h1>Footer</h1>
      </footer>
    </Box>
  );
}

export default Layout;
