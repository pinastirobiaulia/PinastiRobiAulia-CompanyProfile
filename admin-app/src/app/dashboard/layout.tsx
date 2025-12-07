'use client'

import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='page-wrapper flex w-full'>
        <div className='xl:block hidden'>
          <Sidebar />
        </div>
        <div className='body-wrapper w-full !pt-0'>
          <Header />
          <div className="bg-lightgray dark:bg-dark mr-3 rounded-3xl min-h-[90vh]">
            <div className={`container mx-auto px-6 py-4`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
