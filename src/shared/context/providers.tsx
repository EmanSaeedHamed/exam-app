'use client';
import React from 'react'
import { RegisterContextProvider } from '@/shared/context/register-context';
import NextAuthProvider from './next-auth.provider'
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <NextAuthProvider>
      <RegisterContextProvider>
      {children}
    </RegisterContextProvider>
    <Toaster />
      </NextAuthProvider>
    
  )
}