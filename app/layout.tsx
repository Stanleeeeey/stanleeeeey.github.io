'use client'

import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import styles from "./layout.module.css";
import "./global.css";
import Script from 'next/script'

import 'bootstrap-icons/font/bootstrap-icons.css'

const inter = Montserrat({ subsets: ["latin"] });




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  const [themeState, setThemeState] = useState("darkMode");



  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="e5_KYLbv42cc-4a1VFCMpjgUqkOG3sXKm1jNK-IPZww" />
        <Script src="../js/main.js"></Script>
        <link rel="stylesheet" href="../css/themes.css" />
        <link rel="stylesheet" href="../css/global.css" />

      </head>
      <body className={inter.className} id = {themeState} onLoad={() => {"setup_main()"}}>
          <nav className={styles.navbar}>
            <div className={styles.menu}>
                <a href="/#landing-page">HOME</a>
                <a href="/#projects">PROJECTS</a>
                <a href="/#blog">BLOG</a>

            </div>
            <div className={styles.colorSchemes}>
              <a onClick={() => {setThemeState("retroMode")}} id="retro">RETRO</a>
              <a onClick={() => {setThemeState("darkMode")}} id="dark">DARK</a>
            </div>
        </nav>
        <div className={styles.contactBar}>
            <div className={styles.links}>
                <a href="https://github.com/Stanleeeeey">
                  <i className={`bi bi-github ${styles.linkIcon}`}></i>
                </a>
                <a href="mailto:dskybus@gmail.com">
                  <i className={`bi bi-envelope ${styles.linkIcon}`}></i>
                </a>
            </div>
            <p>Stanisław Kawulok 2024</p>
            
        </div>
        {children}
      </body>
    </html>
  );
}
