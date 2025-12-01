import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative inline-block text-left ${className ?? ""}`}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-between w-full bg-glass-gradient border border-primary/20 px-4 py-2 cursor-pointer text-sm font-medium text-white shadow-sm focus:outline-none rounded-2xl"
      >
        <div className="w-2 h-2 rounded-full bg-secondary" />
        <span className="ml-2 text-sm font-medium">{label}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {open && (
        <div className="z-40 absolute right-0 bg-black mt-2 w-48 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 rounded-2xl">
          <div className="py-3 px-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="block w-full rounded-xl text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
