
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div className="container">
        <Link href="/" className="navbar-brand nome-logo">
          <Image
            src="/img/logo.png"
            alt="Céu de Letras"
            width={80}
            height={60}
            priority
          />
          {' '}Céu de Letras
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="menuPrincipal"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Início
              </Link>
            </li>

            <li className="nav-item">
                <Link href="/eventos" className="nav-link">
                    Eventos
                </Link>
            </li>

            <li className="nav-item">
              <Link href="/admin" className="nav-link">
                Gerenciar eventos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/admin"
                className="btn btn-outline-dourado"
              >
                Cadastrar evento
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
