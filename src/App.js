import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ListingPage from "./ListingPage";
import DataEntryPage from "./DataEntryPage";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    // Wrap your app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/data-entry" element={<DataEntryPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
