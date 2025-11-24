import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BatchesPage from "./pages/Batches";
import { TraceDetail } from "./pages/TraceDetailPage";
import { QRScanner } from "./pages/QRScanner";
import BatchDetail from "./pages/TraceDetail";
import CreateBatch from "./pages/CreateBatch";
import ProductManagement from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import CreateOrganization from "./pages/Orgnizations";
import TransferBatchPage from "./pages/TransferBatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/batches" element={<BatchesPage />}></Route>
          <Route path="/batches/create" element={<CreateBatch />}></Route>
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/trace" element={<TraceDetail />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/batches/:id" element={<BatchDetail />} />
          <Route path="batches/:id/transfer" element={<TransferBatchPage />} />
          <Route path="organizations" element={<CreateOrganization />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
