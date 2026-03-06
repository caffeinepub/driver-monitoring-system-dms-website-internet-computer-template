import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, type Category } from "@/data/resources";
import {
  BookOpen,
  BookmarkIcon,
  GraduationCap,
  MoonIcon,
  SunIcon,
  X,
} from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  bookmarkCount: number;
  showBookmarks: boolean;
  onBookmarksToggle: () => void;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  "all",
  "programming-notes",
  "useful-websites",
  "coding-practice",
  "free-courses",
];

export function Navbar({
  isDark,
  onThemeToggle,
  bookmarkCount,
  showBookmarks,
  onBookmarksToggle,
  activeCategory,
  onCategoryChange,
}: NavbarProps) {
  return (
    <header
      data-ocid="nav.panel"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md"
    >
      {/* Top bar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
              <img
                src="/assets/generated/studyhub-logo-transparent.dim_120x120.png"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback =
                    target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <GraduationCap
                className="h-5 w-5 text-primary hidden"
                aria-hidden="true"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Study<span className="text-primary">Hub</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              data-ocid="theme.toggle"
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="relative h-9 w-9"
            >
              {isDark ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>

            {/* Bookmarks toggle */}
            <Button
              data-ocid="bookmarks.toggle"
              variant={showBookmarks ? "default" : "ghost"}
              size="icon"
              onClick={onBookmarksToggle}
              aria-label={
                showBookmarks ? "Show all resources" : "Show bookmarks"
              }
              className="relative h-9 w-9"
            >
              {showBookmarks ? (
                <X className="h-4 w-4" />
              ) : (
                <BookmarkIcon className="h-4 w-4" />
              )}
              {bookmarkCount > 0 && !showBookmarks && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-[16px] px-0.5 text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-0 rounded-full">
                  {bookmarkCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Category tabs */}
        <nav
          className="flex items-center gap-1 pb-0 overflow-x-auto scrollbar-hide"
          aria-label="Resource categories"
        >
          {CATEGORIES.map((cat, index) => {
            const isActive = !showBookmarks && activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                data-ocid={`category.tab.${index + 1}`}
                onClick={() => onCategoryChange(cat)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-t-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {cat === "all" && <BookOpen className="h-3.5 w-3.5" />}
                <span>{CATEGORY_LABELS[cat]}</span>
                {isActive && (
                  <span
                    data-ocid="nav.tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
          {showBookmarks && (
            <button
              type="button"
              className="relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap text-primary"
            >
              <BookmarkIcon className="h-3.5 w-3.5" />
              <span>Bookmarks</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
