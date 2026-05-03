import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { NewsTicker } from "./NewsTicker";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <CustomCursor />
      <NewsTicker />
      <Navbar />
      <main style={{ paddingTop: "108px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
