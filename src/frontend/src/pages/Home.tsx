import { HeroSection } from "@/components/study/HeroSection";
import { Navbar } from "@/components/study/Navbar";
import { ResourceGrid } from "@/components/study/ResourceGrid";
import { SuggestForm } from "@/components/study/SuggestForm";
import { CATEGORY_LABELS, type Category, resources } from "@/data/resources";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useTheme } from "@/hooks/useTheme";
import {
  BookOpen,
  Code,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STAT_ITEMS = [
  {
    icon: BookOpen,
    label: "Programming Notes",
    count: 4,
    color: "text-[oklch(var(--cat-notes))]",
    bg: "bg-[oklch(var(--cat-notes-bg))]",
  },
  {
    icon: Globe,
    label: "Useful Websites",
    count: 4,
    color: "text-[oklch(var(--cat-websites))]",
    bg: "bg-[oklch(var(--cat-websites-bg))]",
  },
  {
    icon: Code,
    label: "Coding Practice",
    count: 4,
    color: "text-[oklch(var(--cat-practice))]",
    bg: "bg-[oklch(var(--cat-practice-bg))]",
  },
  {
    icon: Zap,
    label: "Free Courses",
    count: 4,
    color: "text-[oklch(var(--cat-courses))]",
    bg: "bg-[oklch(var(--cat-courses-bg))]",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [showBookmarks, setShowBookmarks] = useState(false);

  const { isDark, toggle: toggleTheme } = useTheme();
  const {
    bookmarks,
    toggle: toggleBookmark,
    count: bookmarkCount,
  } = useBookmarks();

  function handleCategoryChange(cat: Category) {
    setActiveCategory(cat);
    setShowBookmarks(false);
  }

  function handleBookmarksToggle() {
    setShowBookmarks((prev) => !prev);
    if (!showBookmarks) {
      setSearch("");
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <Navbar
        isDark={isDark}
        onThemeToggle={toggleTheme}
        bookmarkCount={bookmarkCount}
        showBookmarks={showBookmarks}
        onBookmarksToggle={handleBookmarksToggle}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero */}
        <HeroSection search={search} onSearchChange={setSearch} />

        {/* Stats row */}
        <section className="border-y border-border bg-muted/30 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STAT_ITEMS.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() =>
                    handleCategoryChange(
                      item.label === "Programming Notes"
                        ? "programming-notes"
                        : item.label === "Useful Websites"
                          ? "useful-websites"
                          : item.label === "Coding Practice"
                            ? "coding-practice"
                            : "free-courses",
                    )
                  }
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div
                    className={`h-10 w-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <div
                      className={`text-lg font-display font-bold ${item.color}`}
                    >
                      {item.count}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">
                      {item.label}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources section */}
        <section className="container mx-auto px-4">
          {/* Section header */}
          <div className="pt-8 pb-2">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {showBookmarks ? (
                <>Saved Resources</>
              ) : (
                <>{CATEGORY_LABELS[activeCategory]}</>
              )}
            </h2>
          </div>

          <ResourceGrid
            resources={resources}
            search={search}
            activeCategory={activeCategory}
            showBookmarks={showBookmarks}
            bookmarkedIds={bookmarks}
            onBookmarkToggle={toggleBookmark}
          />
        </section>

        {/* Suggest form */}
        <SuggestForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display font-semibold text-foreground">
                StudyHub
              </span>
              <span>—</span>
              <span>Student Resource Hub</span>
            </div>

            {/* Attribution + GitHub */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
                <span>Portfolio Ready</span>
              </a>
              <span>·</span>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                © {currentYear}. Built with ♥ using caffeine.ai
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
