import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Resource } from "@/data/resources";
import { BookmarkIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_STYLES: Record<
  Resource["category"],
  { badge: string; border: string; label: string }
> = {
  "programming-notes": {
    badge: "cat-notes",
    border: "card-notes",
    label: "Programming Notes",
  },
  "useful-websites": {
    badge: "cat-websites",
    border: "card-websites",
    label: "Useful Websites",
  },
  "coding-practice": {
    badge: "cat-practice",
    border: "card-practice",
    label: "Coding Practice",
  },
  "free-courses": {
    badge: "cat-courses",
    border: "card-courses",
    label: "Free Courses",
  },
};

interface ResourceCardProps {
  resource: Resource;
  index: number;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string) => void;
}

export function ResourceCard({
  resource,
  index,
  isBookmarked,
  onBookmarkToggle,
}: ResourceCardProps) {
  const style = CATEGORY_STYLES[resource.category];

  return (
    <motion.article
      data-ocid={`resource.card.${index}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className={`resource-card bg-card rounded-xl overflow-hidden flex flex-col w-full ${style.border}`}
    >
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Top row: category badge + bookmark */}
        <div className="flex items-start justify-between gap-2">
          <span
            className={`${style.badge} text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {style.label}
          </span>

          <button
            type="button"
            data-ocid={`resource.bookmark.${index}`}
            onClick={() => onBookmarkToggle(resource.id)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            aria-pressed={isBookmarked}
            className={[
              "flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isBookmarked
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10",
            ].join(" ")}
          >
            <BookmarkIcon
              className="h-4 w-4"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg leading-snug text-card-foreground">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {resource.title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-mono px-2 py-0.5 rounded-md"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-xs font-medium"
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              Visit
            </a>
          </Button>

          {resource.downloadUrl && (
            <Button
              data-ocid={`resource.download.${index}`}
              asChild
              size="sm"
              className="flex-1 gap-1.5 text-xs font-medium"
            >
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Download
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
