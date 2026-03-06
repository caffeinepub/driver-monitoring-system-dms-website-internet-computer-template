import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Send } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  name: string;
  email: string;
  resourceTitle: string;
  resourceUrl: string;
  message: string;
  createdAt: number;
}

const STORAGE_KEY = "studyhub-suggestions";

function saveSuggestion(suggestion: Suggestion): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: Suggestion[] = raw ? JSON.parse(raw) : [];
    arr.push(suggestion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    // ignore
  }
}

interface FormState {
  name: string;
  email: string;
  resourceTitle: string;
  resourceUrl: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  resourceTitle: "",
  resourceUrl: "",
  message: "",
};

interface FieldErrors {
  name?: string;
  email?: string;
  resourceTitle?: string;
  resourceUrl?: string;
  message?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.resourceTitle.trim())
    errors.resourceTitle = "Resource title is required.";
  if (!form.resourceUrl.trim()) {
    errors.resourceUrl = "Resource URL is required.";
  } else {
    try {
      new URL(form.resourceUrl);
    } catch {
      errors.resourceUrl = "Please enter a valid URL (include https://).";
    }
  }
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

export function SuggestForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Focus first error field
      const firstKey = Object.keys(fieldErrors)[0] as keyof FormState;
      const el = document.getElementById(`suggest-${firstKey}`);
      el?.focus();
      return;
    }

    setLoading(true);
    // Simulate async save
    setTimeout(() => {
      const suggestion: Suggestion = {
        id: `sug-${Date.now()}`,
        ...form,
        createdAt: Date.now(),
      };
      saveSuggestion(suggestion);
      setSubmitted(true);
      setLoading(false);
      toast.success("Thanks! Your suggestion has been saved.", {
        description: `We'll review "${form.resourceTitle}" soon.`,
      });
    }, 600);
  }

  function handleReset() {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <section
      data-ocid="suggest.section"
      id="suggest"
      className="py-16 border-t border-border"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Suggest a Resource
            </h2>
            <p className="text-muted-foreground">
              Know a great resource we&apos;re missing? Share it with the
              community!
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              data-ocid="suggest.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-10 text-center shadow-card"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <Send className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Suggestion Received!
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Thanks for submitting{" "}
                <strong className="text-foreground">
                  {form.resourceTitle}
                </strong>
                . We&apos;ll review it and add it to StudyHub if it&apos;s a
                great fit.
              </p>
              <Button onClick={handleReset} variant="outline">
                Suggest Another Resource
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              noValidate
              className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="suggest-name" className="font-medium">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="suggest-name"
                    data-ocid="suggest.name.input"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    aria-describedby={
                      errors.name ? "suggest-name-error" : undefined
                    }
                    aria-invalid={!!errors.name}
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive/50"
                        : ""
                    }
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p
                      id="suggest-name-error"
                      className="text-xs text-destructive"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="suggest-email" className="font-medium">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="suggest-email"
                    data-ocid="suggest.email.input"
                    type="email"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    aria-describedby={
                      errors.email ? "suggest-email-error" : undefined
                    }
                    aria-invalid={!!errors.email}
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive/50"
                        : ""
                    }
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p
                      id="suggest-email-error"
                      className="text-xs text-destructive"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Resource Title */}
              <div className="space-y-1.5">
                <Label htmlFor="suggest-resourceTitle" className="font-medium">
                  Resource Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="suggest-resourceTitle"
                  data-ocid="suggest.title.input"
                  placeholder="e.g. TypeScript Deep Dive"
                  value={form.resourceTitle}
                  onChange={(e) =>
                    handleChange("resourceTitle", e.target.value)
                  }
                  aria-describedby={
                    errors.resourceTitle ? "suggest-title-error" : undefined
                  }
                  aria-invalid={!!errors.resourceTitle}
                  className={
                    errors.resourceTitle
                      ? "border-destructive focus-visible:ring-destructive/50"
                      : ""
                  }
                />
                {errors.resourceTitle && (
                  <p
                    id="suggest-title-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.resourceTitle}
                  </p>
                )}
              </div>

              {/* Resource URL */}
              <div className="space-y-1.5">
                <Label htmlFor="suggest-resourceUrl" className="font-medium">
                  Resource URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="suggest-resourceUrl"
                  data-ocid="suggest.url.input"
                  type="url"
                  placeholder="https://example.com/resource"
                  value={form.resourceUrl}
                  onChange={(e) => handleChange("resourceUrl", e.target.value)}
                  aria-describedby={
                    errors.resourceUrl ? "suggest-url-error" : undefined
                  }
                  aria-invalid={!!errors.resourceUrl}
                  className={
                    errors.resourceUrl
                      ? "border-destructive focus-visible:ring-destructive/50"
                      : ""
                  }
                />
                {errors.resourceUrl && (
                  <p
                    id="suggest-url-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.resourceUrl}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="suggest-message" className="font-medium">
                  Why should we include this?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="suggest-message"
                  data-ocid="suggest.message.textarea"
                  placeholder="Describe why this resource is valuable for students..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  aria-describedby={
                    errors.message ? "suggest-message-error" : undefined
                  }
                  aria-invalid={!!errors.message}
                  className={
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive/50 resize-none"
                      : "resize-none"
                  }
                />
                {errors.message && (
                  <p
                    id="suggest-message-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                data-ocid="suggest.submit_button"
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Suggestion
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
