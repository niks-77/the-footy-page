import './Footer.styl'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          &copy; {new Date().getFullYear()} The Footy Page
        </div>
        <div className="footer-center">
          Dev's Links:
          <a href="https://www.linkedin.com/in/nikstav/" 
          target="_blank" rel="noreferrer">LinkedIn</a>

          <a href="https://github.com/niks-77" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
