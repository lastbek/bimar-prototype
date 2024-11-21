import Image from 'next/image';
import Link from 'next/link';

interface SponsoredAdProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  sponsor: string;
}

export function SponsoredAd({
  title,
  description,
  imageUrl,
  link,
  sponsor,
}: SponsoredAdProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-xs text-muted-foreground mb-2">
          {sponsor} tomonidan reklama
        </div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <Link
          href={link}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
}
