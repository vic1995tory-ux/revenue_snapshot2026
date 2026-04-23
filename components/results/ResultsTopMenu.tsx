"use client";

import { useState } from "react";
import { CalendarDays, HelpCircle, Send, UserRound } from "lucide-react";

const tgContactUrl = "https://t.me/growth_avenue_company";
const waContactUrl = "https://wa.me/995555163833";

export function ResultsTopMenu({
  profileHref = "/cabinet-login",
}: {
  profileHref?: string;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
      <div className="rs-top-actions flex flex-wrap items-center justify-end gap-2 border border-white/10 bg-[#0d131b]/82 p-2 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <a
          href={profileHref}
          className="inline-flex h-10 items-center gap-2 rounded-[18px] px-4 text-sm font-medium text-white/78 transition hover:bg-white/8 hover:text-white"
        >
          <UserRound size={16} />
          Profile
        </a>

        <div className="relative">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[18px] px-4 text-sm font-medium text-white/78 transition hover:bg-white/8 hover:text-white"
            onClick={() => {
              setCalendarOpen((value) => !value);
              setHelpOpen(false);
            }}
          >
            <CalendarDays size={16} />
            Book decompose
          </button>

          {calendarOpen ? (
            <div className="absolute right-0 mt-3 w-[300px] rounded-[22px] border border-white/10 bg-[#111820] p-4 shadow-2xl shadow-black/35">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">
                Calendar
              </div>
              <div className="mt-2 text-[18px] font-semibold leading-[1.2] text-white">
                Decompose booking
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-white/42">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div key={`${day}-${index}`}>{day}</div>
                ))}
                {Array.from({ length: 28 }, (_, index) => (
                  <button
                    key={index + 1}
                    type="button"
                    className="aspect-square rounded-full text-xs text-white/70 transition hover:bg-[#f7d237] hover:text-[#111820]"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs leading-[1.55] text-white/45">
                Календарь подключим и настроим позже.
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[18px] bg-[#f7d237] px-4 text-sm font-semibold text-[#111820] transition hover:bg-[#ffe15a]"
            onClick={() => {
              setHelpOpen((value) => !value);
              setCalendarOpen(false);
            }}
          >
            <HelpCircle size={16} />
            Help
          </button>

          {helpOpen ? (
            <div className="absolute right-0 mt-3 grid w-[220px] gap-2 rounded-[22px] border border-white/10 bg-[#111820] p-3 shadow-2xl shadow-black/35">
              <a
                href={tgContactUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-[16px] bg-white/[0.05] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.09]"
              >
                Telegram
                <Send size={15} />
              </a>
              <a
                href={waContactUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-[16px] bg-white/[0.05] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.09]"
              >
                WhatsApp
                <Send size={15} />
              </a>
            </div>
          ) : null}
        </div>
      </div>
  );
}
