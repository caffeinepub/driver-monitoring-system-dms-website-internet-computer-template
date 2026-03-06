import { Input } from "@/components/ui/input";
import { SearchIcon, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const floatingChips = [
  { label: "JavaScript", color: "cat-notes" },
  { label: "Python", color: "cat-notes" },
  { label: "LeetCode", color: "cat-practice" },
  { label: "Free Courses", color: "cat-courses" },
  { label: "CSS", color: "cat-websites" },
  { label: "Git", color: "cat-notes" },
  { label: "Algorithms", color: "cat-practice" },
  { label: "React", color: "cat-websites" },
];

export function HeroSection({ search, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 hero-mesh grid-pattern">
      <div className="container mx-auto px-4 relative z-10">
        {/* Chip row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {floatingChips.map((chip) => (
            <span
              key={chip.label}
              className={`${chip.color} text-xs font-mono font-medium px-3 py-1 rounded-full`}
            >
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase font-mono">
              Student Resource Hub
            </span>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            Your Ultimate{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Student</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/15 -z-0 rounded" />
            </span>{" "}
            Resource Hub
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Curated programming notes, websites, tools, and free courses for
            developers. Bookmark your favorites and build faster.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="search.input"
              type="search"
              placeholder="Search resources, topics, tags..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 h-14 text-base rounded-2xl border-border bg-card shadow-card focus-visible:ring-primary/50 focus-visible:border-primary/50"
              aria-label="Search resources"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            16 resources across 4 categories · Updated regularly
          </p>
        </motion.div>
      </div>
    </section>
  );
}
