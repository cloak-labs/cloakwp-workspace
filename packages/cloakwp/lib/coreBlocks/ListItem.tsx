import { classNames } from "../utils/classNames"

export default function ListItem({block}) {
  const { content, className } = block.data.attrs

  return (
    <li className={classNames("list-circle", className)}>{content}</li>
  )
}
