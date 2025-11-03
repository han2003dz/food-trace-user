import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BatchesPage from "./pages/Batches";
import { CreateBatchForm } from "./components/pages/batches/CreateBatchForm";
// import CreateBatch from "./pages/CreateBatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/batches" element={<BatchesPage />}></Route>
          <Route path="/batches/create" element={<CreateBatchForm />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
