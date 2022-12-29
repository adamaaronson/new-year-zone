import "../css/Footer.scss"

export function Footer() {
    return <footer className="footer">
        © {new Date().getFullYear()}&nbsp;
        <a href="https://twitter.com/aaaronson" target="_blank" rel="noopener noreferrer">Adam</a>
        &nbsp;and&nbsp;
        <a href="https://twitter.com/larryaaronson" target="_blank" rel="noopener noreferrer">Larry</a>
        &nbsp;Aaronson
    </footer>
}