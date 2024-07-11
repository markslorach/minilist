import { ReactNode } from "react"
import NavBar from "../NavBar"
import Footer from "../Footer"

const AppLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className="flex flex-col min-h-dvh md:min-h-screen mx-auto max-w-3xl px-4 sm:px-10">
    <NavBar />
    <div className="flex-grow">{children}</div>
    <Footer />
  </main>
  )
}

export default AppLayout