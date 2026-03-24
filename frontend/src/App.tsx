import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ResumePage } from "./pages/ResumePage";
import { ReadinessPage } from "./pages/ReadinessPage";
import { PremiumPage } from "./pages/PremiumPage";
import { RecruiterPage } from "./pages/RecruiterPage";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("myjobmate-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("myjobmate-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout theme={theme} onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="readiness" element={<ReadinessPage />} />
          <Route path="premium" element={<PremiumPage />} />
          <Route path="recruiter" element={<RecruiterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
