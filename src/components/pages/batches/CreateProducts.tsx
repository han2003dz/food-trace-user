import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useCreateProduct } from "@/hooks/useProducts";

export const ProductCreate = () => {
  const { mutateAsync, isPending } = useCreateProduct();
  const [form, setForm] = useState({
    name: "",
    origin: "",
    manufacture_date: "",
    expiry_date: "",
    image_url: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await mutateAsync(form);
      console.log("res2", res);
      toast.success("Product created");
      setForm({
        name: "",
        origin: "",
        manufacture_date: "",
        expiry_date: "",
        image_url: "",
        description: "",
      });
    } catch (err: any) {
      toast.error(`Error: description: ${err.message} `);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold">Tạo Sản Phẩm</h2>

      <Input
        name="name"
        placeholder="Tên sản phẩm"
        onChange={handleChange}
        value={form.name}
      />
      <Input
        name="origin"
        placeholder="Nguồn gốc"
        onChange={handleChange}
        value={form.origin}
      />
      <Input
        name="manufacture_date"
        type="date"
        onChange={handleChange}
        value={form.manufacture_date}
      />
      <Input
        name="expiry_date"
        type="date"
        onChange={handleChange}
        value={form.expiry_date}
      />
      <Input
        name="image_url"
        placeholder="Ảnh sản phẩm (optional)"
        onChange={handleChange}
        value={form.image_url}
      />
      <textarea
        name="description"
        placeholder="Mô tả sản phẩm"
        className="w-full border rounded-md p-2"
        onChange={handleChange}
        value={form.description}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Đang tạo..." : "Tạo sản phẩm"}
      </Button>
    </div>
  );
};
