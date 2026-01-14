import ThemeProvider from "@/src/components/ThemeProvider";

import { Router } from "./Router";

export default () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
