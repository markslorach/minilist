import React, { ReactNode } from 'react'

const ClerkLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='flex justify-center items-center mt-10'>
        {children}
    </main>
  )
}

export default ClerkLayout