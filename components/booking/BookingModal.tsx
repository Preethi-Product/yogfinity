"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useBooking } from "./BookingContext";
import { bookingForm } from "@/constants/content";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

interface FormState {
  name: string;
  email: string;
  phone: string;
  classChoice: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  classChoice?: string;
  submit?: string;
}

const initial: FormState = { name: "", email: "", phone: "", classChoice: "" };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2) errors.name = "Name is too short.";

  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (digits.length < 7) errors.phone = "Phone number looks too short.";

  if (!values.classChoice) errors.classChoice = "Please choose a class.";

  return errors;
}

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setValues(initial);
        setErrors({});
        setSuccess(false);
        setSubmitting(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(values);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setSuccess(true);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Could not submit. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label="Close booking dialog"
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md interactive"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-charcoal border border-amber/20 rounded-sm p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] fascia-pattern"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 text-ivory/50 hover:text-amber transition-colors interactive p-2"
            >
              <X size={20} />
            </button>

            {success ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-amber/40 flex items-center justify-center bg-amber/10">
                  <Check className="text-amber" size={28} />
                </div>
                <h3
                  id="booking-title"
                  className="font-display text-3xl md:text-4xl italic font-light text-ivory mb-3"
                >
                  You&rsquo;re booked.
                </h3>
                <p className="text-ivory/60 text-sm md:text-base leading-relaxed font-light mb-2 max-w-sm mx-auto">
                  Thank you, <span className="text-amber">{values.name.split(" ")[0]}</span>.
                </p>
                <p className="text-ivory/50 text-sm md:text-base leading-relaxed font-light mb-8 max-w-sm mx-auto">
                  We&rsquo;ll confirm your <span className="text-amber">{values.classChoice}</span> session within 24 hours.
                </p>
                <Button variant="outline" onClick={close}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <Logo size={36} />
                  <span className="font-sans text-[10px] tracking-[0.3em] text-amber uppercase">
                    Founding Cohort
                  </span>
                </div>
                <h3
                  id="booking-title"
                  className="font-display text-3xl md:text-4xl italic font-light text-ivory leading-tight mb-2"
                >
                  {bookingForm.title}
                </h3>
                <p className="text-ivory/55 text-sm font-light mb-8">
                  {bookingForm.subtitle}
                </p>

                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <Field
                    label="Full Name"
                    id="bk-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange("name")}
                    error={errors.name}
                    placeholder="Your full name"
                  />
                  <Field
                    label="Email Address"
                    id="bk-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange("email")}
                    error={errors.email}
                    placeholder="your@email.com"
                  />
                  <Field
                    label="Phone Number"
                    id="bk-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={onChange("phone")}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                  />

                  <div>
                    <label
                      htmlFor="bk-class"
                      className="block text-[10px] tracking-[0.25em] uppercase text-ivory/50 mb-2"
                    >
                      Choose a Class
                    </label>
                    <div className="relative">
                      <select
                        id="bk-class"
                        value={values.classChoice}
                        onChange={onChange("classChoice")}
                        aria-invalid={Boolean(errors.classChoice)}
                        className={`interactive w-full appearance-none bg-obsidian/60 border rounded-sm px-4 py-3 pr-10 text-sm text-ivory focus:outline-none transition-colors ${
                          errors.classChoice
                            ? "border-red-400/60 focus:border-red-400"
                            : "border-ivory/10 focus:border-amber/60"
                        } ${values.classChoice ? "" : "text-ivory/40"}`}
                      >
                        <option value="">Select a class →</option>
                        {bookingForm.classOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-charcoal text-ivory">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 text-xs">
                        ▾
                      </span>
                    </div>
                    {errors.classChoice && (
                      <p className="mt-2 text-[11px] text-red-400/90">
                        {errors.classChoice}
                      </p>
                    )}
                  </div>

                  {errors.submit && (
                    <p className="text-xs text-red-400" role="alert">
                      {errors.submit}
                    </p>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="filled"
                      className="w-full !py-4"
                      disabled={submitting}
                    >
                      {submitting ? "Sending…" : bookingForm.submit}
                    </Button>
                  </div>

                  <p className="text-[11px] text-ivory/40 text-center pt-1 tracking-wide">
                    {bookingForm.disclaimer}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

function Field({
  label,
  id,
  type,
  autoComplete,
  value,
  onChange,
  error,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] tracking-[0.25em] uppercase text-ivory/50 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`interactive w-full bg-obsidian/60 border rounded-sm px-4 py-3 text-sm text-ivory placeholder:text-ivory/25 focus:outline-none transition-colors ${
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-ivory/10 focus:border-amber/60"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[11px] text-red-400/90">
          {error}
        </p>
      )}
    </div>
  );
}
