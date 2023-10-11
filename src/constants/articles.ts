import type { FieldType } from "@/types/articles";

// We need OptionsType just once and just here
interface OptionsType {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

export const fields: FieldType[] = [
  {
    key: "#",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
    formatter: (value: { username: string }) => {
      return `@${value.username}`;
    },
    class: "text-center",
  },
  {
    key: "tagList",
    label: "Tags",
    formatter: tagListFormat,
    class: "text-center",
  },
  {
    key: "body",
    label: "Excerpt",
    formatter: excerptGenerator,
    class: "text-center",
  },
  {
    key: "createdAt",
    label: "Created",
    formatter: dateFormat,
  },
  { key: "actions", label: "Actions" },
];

// ********* Methods ***********

function dateFormat(isoDate: string): string {
  const options: OptionsType = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(isoDate).toLocaleDateString(undefined, options);
}

function tagListFormat(tagList: Array<string>): string {
  return tagList.join(", ");
}
function excerptGenerator(value: string): string {
  const words: string[] = value.split(" ");
  if (value.length <= 20) {
    return value;
  } else {
    const excerpt: string = words.slice(0, 20).join(" ");
    return `${excerpt}...`;
  }
}
