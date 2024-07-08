import Link from "next/link"

const Footer = () => {
  return (
    <footer className="h-20 items-center flex">
        <p>created by <Link className="text-blue-400" href="https://www.markslorach.com/" target="_blank">mark slorach</Link>.</p>
    </footer>
  )
}

export default Footer