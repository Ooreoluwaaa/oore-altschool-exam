import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}