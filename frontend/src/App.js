// import { useEffect, useState } from "react";

// const API_BASE_URL = "http://127.0.0.1:8000";

// const Card = ({ title, desc, img }) => (
//   <div className="col-md-4 mb-3">
//     <div className="card h-100 shadow-sm">
//       {img && (
//         <img
//           src={img}
//           alt={title || "Movie"}
//           className="card-img-top"
//           style={{
//             height: "200px",
//             objectFit: "cover",
//           }}
//         />
//       )}

//       <div className="card-body">
//         <h5>{title || "Untitled"}</h5>
//         <p>{desc || "No description available."}</p>
//       </div>
//     </div>
//   </div>
// );

// export default function App() {
//   const [categories, setCategories] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [categoryResponse, movieResponse] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/category/category/`),
//           fetch(`${API_BASE_URL}/api/movie/movie/`),
//         ]);

//         if (!categoryResponse.ok) {
//           throw new Error(
//             `Category API error: ${categoryResponse.status}`
//           );
//         }

//         if (!movieResponse.ok) {
//           throw new Error(
//             `Movie API error: ${movieResponse.status}`
//           );
//         }

//         const categoryData = await categoryResponse.json();
//         const movieData = await movieResponse.json();

//         console.log("Category data:", categoryData);
//         console.log("Movie data:", movieData);

//         setCategories(Array.isArray(categoryData) ? categoryData : []);
//         setMovies(Array.isArray(movieData) ? movieData : []);

//       } catch (err) {
//         console.error("API Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mt-5">
//         <h3>Loading...</h3>
//         <p>Connecting to Django...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">
//           <h4>Backend connection error</h4>
//           <p>{error}</p>

//           <p>
//             Make sure Django is running at:
//           </p>

//           <strong>
//             http://127.0.0.1:8000
//           </strong>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">

//       {/* Categories */}

//       <h2 className="mb-3">Categories</h2>

//       <div className="row mb-5">
//         {categories.length > 0 ? (
//           categories.map((c, index) => (
//             <Card
//               key={c.category_id || c.id || index}
//               title={c.category_name}
//               desc={c.category_description}
//               img={c.category_image}
//             />
//           ))
//         ) : (
//           <p>No categories found.</p>
//         )}
//       </div>

//       {/* Movies */}

//       <h2 className="mb-3">Movies</h2>

//       <div className="row">
//         {movies.length > 0 ? (
//           movies.map((m, index) => (
//             <Card
//               key={m.movie_id || m.id || index}
//               title={m.movie_name}
//               desc={m.movie_description}
//               img={m.movie_image}
//             />
//           ))
//         ) : (
//           <p>No movies found.</p>
//         )}
//       </div>

//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import "./App.css";
 
const API_BASE_URL = "http://127.0.0.1:8000";
 
export default function App() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryResponse, movieResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/category/category/`),
          fetch(`${API_BASE_URL}/api/movie/movie/`),
        ]);
 
        if (!categoryResponse.ok) {
          throw new Error(`Category API error: ${categoryResponse.status}`);
        }
        if (!movieResponse.ok) {
          throw new Error(`Movie API error: ${movieResponse.status}`);
        }
 
        const categoryData = await categoryResponse.json();
        const movieData = await movieResponse.json();
 
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setMovies(Array.isArray(movieData) ? movieData : []);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
 
    fetchData();
  }, []);
 
  // Group movies under each category so they render as Netflix-style rows.
  const rows = useMemo(() => {
    if (!categories.length) {
      return movies.length ? [{ id: "all", name: "All Titles", items: movies }] : [];
    }
 
    return categories.map((c) => {
      const catId = c.category_id ?? c.id;
      const items = movies.filter(
        (m) => (m.category_id ?? m.category) === catId
      );
      return {
        id: catId,
        name: c.category_name || "Untitled Category",
        items,
      };
    });
  }, [categories, movies]);
 
  const featured = movies[0];
 
  if (loading) {
    return (
      <div className="state-screen">
        <div className="spinner" />
        <h3>Loading</h3>
        <p>Connecting to Django...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="state-screen">
        <div className="error-box">
          <h3>Backend connection error</h3>
          <p>{error}</p>
          <p>Make sure Django is running at:</p>
          <code>{API_BASE_URL}</code>
        </div>
      </div>
    );
  }
 
  return (
    <div className="app">
      <Header brand="CINEMAX" />
 
      {/* Hero */}
      <section
        className="hero"
        style={{
          backgroundImage: featured?.movie_image
            ? `url(${featured.movie_image})`
            : "linear-gradient(135deg, #1f1f1f, #0a0a0a)",
        }}
      >
        <div className="hero-content">
          <p className="hero-eyebrow">Featured Title</p>
          <h1 className="hero-title">
            {featured?.movie_name || "Welcome"}
          </h1>
          <p className="hero-desc">
            {featured?.movie_description ||
              "Browse the catalog below to find something to watch."}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">▶ Play</button>
            <button className="btn btn-secondary">ⓘ More Info</button>
          </div>
        </div>
      </section>
 
      {/* Rows */}
      <div className="rows-wrap">
        {rows.length > 0 ? (
          rows.map((row) => (
            <section className="row" key={row.id}>
              <h2 className="row-title">{row.name}</h2>
              {row.items.length > 0 ? (
                <div className="row-track">
                  {row.items.map((m, index) => (
                    <Card
                      key={m.movie_id || m.id || index}
                      title={m.movie_name}
                      desc={m.movie_description}
                      img={m.movie_image}
                    />
                  ))}
                </div>
              ) : (
                <p className="empty-row">No titles in this category yet.</p>
              )}
            </section>
          ))
        ) : (
          <section className="row">
            <p className="empty-row">No movies found.</p>
          </section>
        )}
      </div>
 
      <Footer />
    </div>
  );
}
 
