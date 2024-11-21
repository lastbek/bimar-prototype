import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime?: string;
  createdAt: string;
  imageUrl: string;
  className?: string;
}

export function NewsCard({
  id,
  title,
  excerpt,
  category,
  readTime = "5 daqiqa",
  createdAt,
  imageUrl,
  className,
}: NewsCardProps) {
  return (
    <Link href={`/articles/${id}`} className={cn("group block", className)}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[16/9] bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F3028]/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {category}
            </div>
          </div>
        </div>
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-2 text-muted-foreground">{excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
