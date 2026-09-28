/**
 * Inner pages sit below the fixed navbar. The home page lives outside this
 * group because its hero image runs underneath the transparent navbar.
 */
export default function InnerPagesLayout({ children }) {
  return <div className="pt-16 md:pt-20">{children}</div>;
}
