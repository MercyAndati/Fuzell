import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Loading Fuzell...</h2>
        <p className="text-gray-600">Where talent excels</p>
      </div>
    </div>
  )
}
