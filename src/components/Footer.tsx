import "../css/Footer.scss"

export function Footer() {
    return <footer className="footer">
        © {new Date().getFullYear()} Adam and Larry Aaronson
    </footer>
}