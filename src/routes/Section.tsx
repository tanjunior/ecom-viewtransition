// import { Outlet } from 'react-router-dom'

import { cn } from "@/lib/utils";

export default function Section({children, className}: { children: React.ReactNode, className?: string }) {
  return (
    <section className={cn('container flex flex-col flex-wrap items-start max-w-screen-lg px-6 pt-8 pb-12 mx-auto overflow-hidden lg:px-0', className)}>
      {children}
    </section>
  )
}
