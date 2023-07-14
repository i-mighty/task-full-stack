import React from "react";
interface MyProps {
  children: React.ReactNode;
}
interface MyState {
  hasError: boolean;
  errorText: string;
}
export class ErrorBoundary extends React.Component<MyProps, MyState> {
  state: MyState = { hasError: false, errorText: "" };

  componentDidCatch<E extends Error>(error: E) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorText: error.message };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
