import type { Category, Resource } from "@/data/resources";
import { BookmarkX, SearchX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ResourceCard } from "./ResourceCard";

interface ResourceGridProps {
  resources: Resource[];
  search: string;
  activeCategory: Category;
  showBookmarks: boolean;
  bookmarkedIds: Set<string>;
  onBookmarkToggle: (id: string) => void;
}

export function ResourceGrid({
  resources,
  search,
  activeCategory,
  showBookmarks,
  bookmarkedIds,
  onBookmarkToggle,
}: ResourceGridProps) {
  // Filter logic
  let filtered = resources;

  if (showBookmarks) {
    filtered = filtered.filter((r) => bookmarkedIds.has(r.id));
  } else if (activeCategory !== "all") {
    filtered = filtered.filter((r) => r.category === activeCategory);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (showBookmarks && filtered.length === 0) {
    return (
      <div
        data-ocid="bookmarks.empty_state"
        className="flex flex-col items-center justify-center py-24 gap-4 text-center"
      >
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
          <BookmarkX className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-1">
            No bookmarks yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Click the bookmark icon on any resource card to save it here for
            quick access.
          </p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div
        data-ocid="search.empty_state"
        className="flex flex-col items-center justify-center py-24 gap-4 text-center"
      >
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-1">
            No results found
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Try a different search term or browse a different category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Result count */}
      <motion.p
        key={`${activeCategory}-${search}-${showBookmarks}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground mb-6"
      >
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "resource" : "resources"}
        {search && (
          <>
            {" "}
            for &ldquo;
            <span className="font-medium text-foreground">{search}</span>&rdquo;
          </>
        )}
      </motion.p>

      <AnimatePresence mode="popLayout">
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0"
          aria-label="Resource cards"
        >
          {filtered.map((resource, idx) => (
            <li key={resource.id} className="flex">
              <ResourceCard
                resource={resource}
                index={idx + 1}
                isBookmarked={bookmarkedIds.has(resource.id)}
                onBookmarkToggle={onBookmarkToggle}
              />
            </li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}
