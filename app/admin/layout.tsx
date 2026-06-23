import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | رسالة السلام",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen font-ui"
      style={{ background: "#0f1a14", color: "#e8ddc7" }}
    >
      {children}
    </div>
  );
}
