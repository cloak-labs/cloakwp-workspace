import { useBlockStyleBuilder } from '../hooks/useBlockStyleBuilder'
import parse from 'html-react-parser'
import { classNames } from '../utils/classNames';

export default function Paragraph({block, className}) {
  const {classes, styles} = useBlockStyleBuilder(block.data)
  
  return (        
    <p
      className={classNames(
        "h-min-content", 
        classes,
        block?.data?.attrs?.backgroundColor ? "p-6" : 'pb-6',
        className
      )}
      style={styles}
    >
      {parse(block.data.attrs.content)}
    </p>
  );
}