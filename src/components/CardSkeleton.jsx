function CardSkeleton({ cantidad = 6, columnClass = 'col-12 col-sm-6 col-lg-4' }) {
  return (
    <>
      {Array.from({ length: cantidad }).map((_, indice) => (
        <div className={columnClass} key={indice}>
          <div className="card h-100 skeleton-card" aria-hidden="true">
            <div className="skeleton-img"></div>
            <div className="card-body">
              <div className="skeleton-line skeleton-line-title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line skeleton-line-short"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CardSkeleton
