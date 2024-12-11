import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import { CartProvider } from "@/utils/ContextReducer";
import { ThemeProvider } from "next-themes";
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router =useRouter()
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(60)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
  },[])
  return (
    <>
     <LoadingBar
        color='red'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
    <ThemeProvider attribute="class">
      <CartProvider>
      <Layout>
         <Component {...pageProps} />;
      </Layout>
      </CartProvider>
    </ThemeProvider></>
  )
}
