function PublishDate({ publishDate }) {
  const formatted = new Date(publishDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <time dateTime={publishDate}>{formatted}</time>;
}

export default PublishDate;
