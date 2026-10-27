function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className = '',
}) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}

export default SectionHeading
