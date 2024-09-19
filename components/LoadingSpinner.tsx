import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
      <Loader2 className="sm:h-8 sm:w-8 md:h-16 md:w-16 animate-spin text-white" />
    </div>
  )
}