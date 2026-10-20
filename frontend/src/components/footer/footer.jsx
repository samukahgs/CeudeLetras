
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-ceud letras">
      <div className="container py-5">
        <div className="row g-4">

          
          <div className="col-12 col-md-5">
            <Link href="/" className="footer-logo">
              Céu de Letras
            </Link>

            <p className="footer-subtitulo">
              LITERATURA · POESIA · EVENTOS
            </p>

            <p className="footer-descricao">
              Um espaço dedicado aos encontros que
              nascem das palavras e à celebração
              da literatura.
            </p>
          </div>

          
          <div className="col-6 col-md-3">
            <h2 className="footer-titulo">Navegação</h2>

            <ul className="footer-links">
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/#eventos">Eventos</Link>
              </li>
              <li>
                <Link href="/admin">
                  Gerenciar eventos
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="col-6 col-md-4">
            <h2 className="footer-titulo">Explore</h2>

            <ul className="footer-links">
              <li>
                <Link href="/#eventos">Poesia</Link>
              </li>
              <li>
                <Link href="/#eventos">Literatura</Link>
              </li>
              <li>
                <Link href="/#eventos">Lançamentos de livros</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      
      <div className="footer-bottom">
        <div className="container text-center">
          <p>
            © {new Date().getFullYear()} Céu de Letras.
            {' '}Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
