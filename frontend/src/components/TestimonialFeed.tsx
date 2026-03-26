import { useMemo } from "react";
import type { TestimonialItem } from "../types";

function relativeTime(input: string) {
  const date = new Date(input).getTime();
  const diff = Date.now() - date;
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * day;

  if (diff < day) {
    const hours = Math.max(1, Math.floor(diff / (60 * 60 * 1000)));
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (diff < week) {
    const days = Math.max(1, Math.floor(diff / day));
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  const weeks = Math.max(1, Math.floor(diff / week));
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export function TestimonialFeed({ testimonials }: { testimonials: TestimonialItem[] }) {
  const feedItems = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  return (
    <div className="testimonial-strip-shell">
      <div className="testimonial-strip-window">
        <div className="testimonial-strip-track">
          {feedItems.map((item, index) => (
            <article key={`${item.id}-${index}`} className="testimonial-strip-card">
              <p className="testimonial-strip-text">“{item.feedbackText}”</p>
              <div className="testimonial-strip-meta">
                <strong>{item.userName}</strong>
                <span>{item.city}</span>
                <time>{relativeTime(item.createdAt)}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
