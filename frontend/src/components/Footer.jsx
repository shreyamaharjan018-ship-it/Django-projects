const FOOTER_COLUMNS = [
  ["FAQ", "Investor Relations", "Privacy", "Speed Test"],

];
 
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-social">
       
      </div>
 
      <div className="footer-links">
        {FOOTER_COLUMNS.flat().map((label) => (
          <button key={label} type="button" className="footer-link">
            {label}
          </button>
        ))}
      </div>
 
      <p className="footer-meta">
        © {new Date().getFullYear()} Cinemax, Inc. — built as a personal project.
      </p>
    </footer>
  );
}
