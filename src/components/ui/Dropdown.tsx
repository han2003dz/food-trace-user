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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-between w-full bg-[#4EB09B] px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 focus:outline-none rounded-2xl"
      >
        {label}
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 rounded-2xl">
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
