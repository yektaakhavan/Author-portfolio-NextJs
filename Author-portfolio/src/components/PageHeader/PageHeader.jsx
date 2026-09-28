import { BsInfoCircleFill, BsHeadset, BsBookmarksFill, BsBookHalf, BsPersonLinesFill, BsCartFill } from "react-icons/bs";

const icons = {
  about: BsInfoCircleFill,
  contact: BsHeadset,
  articles: BsBookmarksFill,
  books: BsBookHalf,
  cart: BsCartFill,
  default: BsPersonLinesFill,
};

function PageHeader({ title, type = "default" }) {
  const Icon = icons[type] || icons.default;

  return (
    <div className="mb-10 text-center">
      <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-2xl text-brand-500">
        <Icon aria-hidden="true" />
      </div>
      <h1 className="inline-block border-b-4 border-gold-500 pb-2 text-2xl font-bold text-brand-700 md:text-3xl">
        {title}
      </h1>
    </div>
  );
}

export default PageHeader;
