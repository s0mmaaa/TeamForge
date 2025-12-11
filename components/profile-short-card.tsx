import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ProfileShortCardProps {
  id: string
  name: string
  category: string
  categoryColor: string
  bio: string
  highlights: string[]
  rating: number
  totalRatings: number
}

export function ProfileShortCard({
  id,
  name,
  category,
  categoryColor,
  bio,
  highlights,
  rating,
  totalRatings,
}: ProfileShortCardProps) {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700",
      pink: "bg-pink-100 text-pink-700",
      red: "bg-red-100 text-red-700",
      blue: "bg-blue-100 text-blue-700",
      cyan: "bg-cyan-100 text-cyan-700",
      orange: "bg-orange-100 text-orange-700",
      amber: "bg-amber-100 text-amber-700",
      green: "bg-green-100 text-green-700",
    }
    return colorMap[color] || colorMap.gray
  }

  return (
    <Link href={`/profile/${id}`}>
      <Card className="bg-slate-700/50 border-slate-600 hover:border-purple-500 hover:bg-slate-700/80 transition-all cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <Badge className={`${getColorClass(categoryColor)} text-xs`}>{category}</Badge>
            </div>
            <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{bio}</p>

          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Highlights:</p>
            <div className="flex flex-wrap gap-1">
              {highlights.slice(0, 3).map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-600">
            <span className="text-xs text-gray-400">({totalRatings} ratings)</span>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              View Full Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
