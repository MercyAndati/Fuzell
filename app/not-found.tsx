import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <AlertCircle className="h-12 w-12 text-blue-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-gray-600 mb-6">Sorry, we couldn’t find that page.</p>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  )
}
