import type { Metadata } from 'next'
import '@/styles/globals.css'
import {cn} from "@/lib/utils";
import {font} from "@/lib/fonts";
import {Navbar} from "@/components/navbar";
import {ToasterProvider} from "@/components/providers/toaster-provider";
import {ModalProvider} from "@/components/providers/modal-provider";

export const metadata: Metadata = {
  title: 'Copy Things',
  description: 'Create and share your stuff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('bg-zinc-300 pt-[60px]', font.className)}>
      <Navbar />
      {children}

      <ToasterProvider />
      <ModalProvider />
      </body>
    </html>
  )
}
