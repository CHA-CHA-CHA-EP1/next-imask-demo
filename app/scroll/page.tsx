"use client";
import { Box, Button } from '@mui/joy';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the scroll handler
    const handleScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem("home-scroll-top", scrollRef.current.scrollTop.toString());
      }
    };

    // Restore scroll position when component mounts
    if (scrollRef.current) {
      const savedScrollTop = sessionStorage.getItem("home-scroll-top") || "0";
      scrollRef.current.scrollTo(0, parseInt(savedScrollTop, 10));
      
      // Add scroll event listener
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    // Cleanup: remove scroll event listener on component unmount
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Box
      ref={scrollRef}
      sx={{
        overflowY: 'scroll',
        height: '100vh', // Ensure the scroll container fills the viewport
        padding: '15px',
      }}
    >
      <Button
        sx={{
          position: 'fixed',
          top: '0px',
        }}
        onClick={() => {
          // Replace with a test route to check scroll persistence
          router.replace("/scroll/test");
        }}
      >
        TEST PAGE
      </Button>

      {/* Generate a list of items to make the page scrollable */}
      {Array.from({ length: 100 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            height: '100px',
            backgroundColor: 'blue',
            padding: '15px',
            color: 'white',
            borderRadius: '15px',
            marginBottom: '5px',
          }}
        >
          Item {index}
        </Box>
      ))}
    </Box>
  );
}

