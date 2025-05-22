import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Manager - Organize Your Tasks',
  description: 'A full-stack task management application built with Next.js, TypeScript, and MySQL',
  keywords: 'task manager, todo, productivity, next.js, typescript, mysql',
  authors: [{ name: 'Full Stack Developer' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}