import parse from 'html-react-parser'

export default function Html({block, className}) {
  return (
    <div className={className}>
      {parse(block.data.rendered)}
    </div>
  )
}