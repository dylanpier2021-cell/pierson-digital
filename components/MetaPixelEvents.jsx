"use client";
// Fires the Meta Pixel `Lead` event when a GoHighLevel booking completes.
//
// The booking calendar is a cross-origin iframe (api.leadconnectorhq.com), so
// the pixel on this page cannot see anything the visitor does inside it — no
// click, no submit, no confirmation screen. GHL's form_embed.js posts a message
// up to the parent window when a booking lands; that message is the only signal
// we get, so we listen for it and fire the conversion ourselves.
import { useEffect } from "react";

const GHL_ORIGIN = "https://api.leadconnectorhq.com";

// GHL has shipped this signal in a few different shapes. Match on the marker
// substring rather than one exact payload, so a format change on their side
// degrades into "still fires" instead of "silently stops firing".
function isBookingComplete(data) {
  if (typeof data === "string") return data.includes("booking-complete");
  if (Array.isArray(data)) {
    return typeof data[0] === "string" && data[0].includes("booking-complete");
  }
  if (data && typeof data === "object") {
    const type = data.type || data.event || data.action;
    return typeof type === "string" && type.includes("booking-complete");
  }
  return false;
}

function payloadOf(data) {
  if (Array.isArray(data)) return data[1] || {};
  if (data && typeof data === "object") return data;
  return {};
}

export default function MetaPixelEvents() {
  useEffect(() => {
    let fired = false;
    const debug = new URLSearchParams(window.location.search).has("pixeldebug");

    function onMessage(event) {
      if (event.origin !== GHL_ORIGIN) return;
      if (debug) console.log("[pixel] message from GHL:", event.data);
      if (!isBookingComplete(event.data)) return;
      if (fired) return; // one booking, one Lead
      fired = true;

      const details = payloadOf(event.data);

      // eventID lets a future Conversions API call dedupe against this
      // browser-side event rather than double-counting the same booking.
      const eventID =
        "book-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);

      if (typeof window.fbq === "function") {
        window.fbq(
          "track",
          "Lead",
          {
            content_name: "Strategy Call Booking",
            content_category: "book-a-call",
          },
          { eventID }
        );
      }

      if (debug) console.log("[pixel] Lead fired:", eventID, details);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
