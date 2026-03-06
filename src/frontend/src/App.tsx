import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
