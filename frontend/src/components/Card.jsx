
export default function Card({ title, desc, img }) {
  return (
    <div className="card">
      {img ? (
        <img src={img} alt={title || "Movie"} className="card-img" />
      ) : (
        <div className="card-img" />
      )}
      <div className="card-body">
        <h3 className="card-title">{title || "Untitled"}</h3>
        <p className="card-desc">{desc || "No description available."}</p>
      </div>
    </div>
  );
}
 
