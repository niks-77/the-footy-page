import './index.styl'
import { FaGithub } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          &copy; {new Date().getFullYear()} The Footy Page
        </div>
        <div className="footer-right">
          <a href="https://www.linkedin.com/in/nikstav/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>

          <a href="https://github.com/niks-77" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
