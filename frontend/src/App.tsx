import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";
import { ErrorBoundary } from "./components/features/ErrorBoundary";

function App() {
  return (
    <ChakraProvider>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
