import { classNames } from "../utils/classNames";

export function useBlockStyleBuilder(block) {
  const {backgroundColor, textColor, className, fontSize, align, textAlign, style, verticalAlignment, layout} = block.attrs
  
  const layoutKeyword = (layout?.orientation == "horizontal" || layout?.type == "flex") ? "justify" : "items"

  const classes = classNames(
    backgroundColor && `bg-${backgroundColor}`,
    textColor && `text-${textColor}`,
    fontSize && `text-${fontSize}`,
    (align || textAlign) && `text-${textAlign || align}`,
    verticalAlignment ? (
      verticalAlignment == 'center' ? 'justify-center' : (
        verticalAlignment == 'bottom' ? 'justify-end' : 'justify-start'
      )
    ) : '',
    (layout && layout.orientation) ? (
      layout.orientation == "horizontal" ? "flex-row" : "flex-col"
    ) : "",
    layout ? (
      layout.justifyContent == "center" ? `${layoutKeyword}-center` : (
        layout.justifyContent == "right" ? `${layoutKeyword}-end` : (
          layout.justifyContent == "space-between" ? `${layoutKeyword}-between` : ''
        )
      )
    ) : "",
    className
  )
    
  let styles = {}
  
  if(style?.spacing?.padding){
    const {top = '0px', right = '0px', bottom = '0px', left = '0px'} = style?.spacing?.padding
    let total = 0
    const arr = [top, right, bottom, left]
    arr?.forEach(val => total += parseFloat(val))
    if(total > 0){
      styles['padding'] = `${top} ${right} ${bottom} ${left}`
    }
  }
  
  if(style?.spacing?.margin){
    const {top = '0px', right = '0px', bottom = '0px', left = '0px'} = style?.spacing?.margin
    let total = 0
    const arr = [top, right, bottom, left]
    arr?.forEach(val => total += parseFloat(val))
    if(total > 0){
      styles['margin'] = `${top} ${right} ${bottom} ${left}`
    }
  }
    
  return {
    classes,
    styles,
  }
}