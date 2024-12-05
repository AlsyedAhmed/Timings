'use client';
import { useState } from "react";
import Image from "next/image";
import Button from '@mui/material/Button';
import Maincentent from "@/Maincentent";
import Container from '@mui/material/Container';
import './main.css';




export default function Home() {
  return (
   <>

    <div style={{direction:"rtl",width:"100vw",margin:"180px 0 0 0"}}>
  
    <Container maxWidth="xl">
      <Maincentent/>
      </Container>
      
    </div>
   </>
  );
}
