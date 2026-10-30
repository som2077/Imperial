import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || `${siteConfig.name} | Ship in Days, Not Months`;
    const description =
      searchParams.get("description") ||
      searchParams.get("subtitle") ||
      "Production-ready Next.js 16 SaaS Boilerplate with Supabase, Drizzle & Lemon Squeezy";
    const badge = searchParams.get("badge") || searchParams.get("category") || "Next.js 16 SaaS";
    const author = searchParams.get("author") || siteConfig.shortName;

    // Truncate title and description to fit comfortably within the 1200x630 canvas
    const displayTitle = title.length > 95 ? `${title.slice(0, 92)}...` : title;
    const displayDesc = description.length > 170 ? `${description.slice(0, 167)}...` : description;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.28) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)",
          padding: "64px 72px",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Outer Frame Border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 24,
          }}
        />

        {/* Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>SaaS Starter</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#a1a1aa",
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                v2.0
              </span>
            </div>
          </div>

          {/* Category / Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 9999,
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              color: "#c4b5fd",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            {badge}
          </div>
        </div>

        {/* Main Title & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 1040,
            marginTop: "auto",
            marginBottom: "auto",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: displayTitle.length > 55 ? 52 : 62,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
            }}
          >
            {displayDesc}
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Tech Tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {["Next.js 16", "Supabase", "Drizzle ORM", "Lemon Squeezy", "Tailwind v4"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#d4d4d8",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "6px 14px",
                    borderRadius: 8,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          {/* Author / Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#71717a",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "#22c55e",
              }}
            />
            <span>{author}</span>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, immutable, no-transform, max-age=86400, s-maxage=86400",
        },
      }
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}
