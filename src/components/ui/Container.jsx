function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`site-container ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}

export default Container
