import { Eyebrow } from '@/components/Text'
import { useBlockStyleBuilder } from 'cloakwp'
import classNames from '@/utils/classNames'

export function H4Block({block, className, children}) {
  const { classes, styles } = useBlockStyleBuilder(block.data)

  return (
    <Eyebrow className={classNames(classes, className)} style={styles}>
      {children}
    </Eyebrow>
  )
}
