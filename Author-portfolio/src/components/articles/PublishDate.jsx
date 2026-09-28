import { formatDate } from "@/lib/format";

export default function PublishDate({ date }) {
  return <time dateTime={date}>{formatDate(date)}</time>;
}
