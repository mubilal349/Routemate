import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        text-slate-700
        shadow-lg
        shadow-slate-900/10
        transition
        duration-200
        hover:-translate-y-1
        hover:bg-slate-50
        hover:text-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-200
        dark:hover:bg-slate-800
        dark:hover:text-blue-400
        dark:focus:ring-offset-slate-950
      "
    >
      <ArrowUp size={19} strokeWidth={2.2} />
    </button>
  );
}

export default BackToTop;
