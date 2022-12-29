import "../css/Footer.scss"

export function Footer() {
    return <footer className="footer">
        <span>© {new Date().getFullYear()} <a href="https://twitter.com/aaaronson" target="_blank" rel="noopener noreferrer">
            Adam</a> and <a href="https://twitter.com/larryaaronson" target="_blank" rel="noopener noreferrer">
            Larry</a> Aaronson / <a href="https://twitter.com/larryaaronson" target="_blank" rel="noopener noreferrer">
            Learn more</a>
        </span>
    </footer>
}