import { Link } from "react-router-dom";

/** Primary call-to-action pill button used across the site. */
function GradientButton({ to, text, onClick, type = "link" }) {
  const className =
    "inline-flex items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-8 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0";

  if (type === "button") {
    return (
      <button type="button" onClick={onClick} className={className}>
        {text}
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  );
}

export default GradientButton;
