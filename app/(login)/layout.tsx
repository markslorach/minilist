import React, { ReactNode } from 'react'

const ClerkLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='h-dvh md:min-h-screen flex justify-center items-center'>
        {children}
    </main>
  )
}

export default ClerkLayout