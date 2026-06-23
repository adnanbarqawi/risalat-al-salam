"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2, "Please enter your name."),
  email:   z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Please write at least 10 characters."),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "var(--ivory)",
    border: "1px solid rgba(200,164,93,0.3)",
    borderRadius: 12,
    padding: "12px 16px",
    width: "100%",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "var(--sand)" }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <span
          className="font-ui text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          Reach Out
        </span>
        <h2
          className="font-display text-4xl md:text-5xl text-center"
          style={{ color: "var(--green)" }}
        >
          Contact
        </h2>
        <div className="divider-gold" />
        <p
          className="font-display italic text-base text-center leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          I would love to hear from you. Send a message and I will respond as
          soon as I am able.
        </p>

        {status === "success" ? (
          <div
            className="w-full rounded-2xl p-10 text-center flex flex-col items-center gap-4"
            style={{ background: "var(--ivory)", border: "1px solid rgba(200,164,93,0.3)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "var(--green)", color: "var(--gold)" }}
            >
              ✓
            </div>
            <h3 className="font-display text-2xl" style={{ color: "var(--green)" }}>
              Message Received
            </h3>
            <p
              className="font-display italic text-base"
              style={{ color: "var(--muted)" }}
            >
              Thank you for reaching out. I will be in touch soon.
            </p>
            <p
              className="font-arabic text-lg"
              style={{ color: "var(--gold)" }}
            >
              السَّلَامُ عَلَيْكُمْ
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                className="font-ui text-xs tracking-wide uppercase block mb-2"
                style={{ color: "var(--muted)" }}
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,164,93,0.3)")}
              />
              {errors.name && (
                <p className="font-ui text-xs mt-1" style={{ color: "#c0392b" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="font-ui text-xs tracking-wide uppercase block mb-2"
                style={{ color: "var(--muted)" }}
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,164,93,0.3)")}
              />
              {errors.email && (
                <p className="font-ui text-xs mt-1" style={{ color: "#c0392b" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                className="font-ui text-xs tracking-wide uppercase block mb-2"
                style={{ color: "var(--muted)" }}
              >
                Message
              </label>
              <textarea
                {...register("message")}
                placeholder="Share what is on your heart…"
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,164,93,0.3)")}
              />
              {errors.message && (
                <p className="font-ui text-xs mt-1" style={{ color: "#c0392b" }}>
                  {errors.message.message}
                </p>
              )}
            </div>

            {status === "error" && (
              <p className="font-ui text-xs text-center" style={{ color: "#c0392b" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-ui text-sm px-8 py-3.5 rounded-full transition-all duration-300 mt-2"
              style={{
                background: status === "sending" ? "var(--muted)" : "var(--green)",
                color: "var(--ivory)",
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
