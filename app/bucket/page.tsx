"use client";
// please write example app router export default Page and console.log prebuild

export default function Page() {
  console.log("prebuild");
  return <div>Page</div>;
}

export async function getServerSideProps() {
  console.log('prebuild')
  return {
    props: {}, // will be passed to the page component as props
  }
}
