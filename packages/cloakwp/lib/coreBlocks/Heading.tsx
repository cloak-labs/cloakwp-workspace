import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder";
import parse from "html-react-parser";
import { classNames } from "../utils/classNames.js";

export default function Heading({ block, className, tags }) {
  const { classes, styles } = useBlockStyleBuilder(block.data);
  const { level, content } = block.data.attrs;

  // console.log("heading tags: ", tags);

  const Tag = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
    ...tags, // dev can override how 1 or more headings get rendered by providing an object "tags" in global config or as Block prop
  }[level];

  return (
    <Tag
      className={classNames(block.isNested && "py-2", classes, className)}
      style={styles}
      {...(typeof Tag == "string" ? {} : { block })}
    >
      {parse(content)}
    </Tag>
  );
}
