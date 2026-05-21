"use client";

import { site, footer } from "@/constants/content";
import { InstagramIcon, YoutubeIcon } from "./SocialIcons";
import Logo from "./Logo";

const socialIcon = (label: string) => {
  if (label === "Instagram") return InstagramIcon;
  return YoutubeIcon;
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#080808] border-t border-ivory/5 fascia-pattern"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-14">
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-3 mb-3 interactive group"
              aria-label={site.name}
            >
              <Logo
                size={48}
                className="transition-transform duration-500 group-hover:rotate-[8deg]"
              />
              <span className="font-display text-lg tracking-[0.3em] text-ivory uppercase">
                {site.name}
              </span>
            </a>
            <p className="text-[10px] tracking-[0.18em] uppercase text-ivory/30 mt-2">
              {site.tagline}
            </p>
            <div className="flex gap-5 mt-6">
              {footer.socials.map((s) => {
                const Icon = socialIcon(s.label);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-ivory/40 hover:text-amber transition-colors interactive"
                    aria-label={s.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-amber text-[10px] tracking-[0.22em] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ivory/45 hover:text-ivory link-underline interactive transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ivory/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.12em] text-ivory/25">
            {footer.copyright}
          </p>
          <ul className="flex gap-5">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[10px] tracking-[0.12em] text-ivory/25 hover:text-amber link-underline interactive transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
