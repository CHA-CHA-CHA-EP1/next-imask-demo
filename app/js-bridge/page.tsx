"use client";

import { internalPartnerInitAuth } from "@/src/jsbridge";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {

    const initConsole = async () => {
      import('eruda').then(({ default: eruda }) => {
        eruda.init();
        auth()
      })

    }

    initConsole()

    const auth = async () => {
      try {
        const response = await internalPartnerInitAuth("PT_MINIAPP", "INSURANCE_PLATFORM_LANDING")
        console.log('response', response)
      } catch (err) {
        console.log('error', err)
      }
    }

    // 14.23.0 (7)
  }, [])

  return (
    <>Hi there</>
  )
}
