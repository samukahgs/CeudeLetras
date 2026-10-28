
import Link from "next/link";

const API_URL = "http://localhost:3001/api/eventos";

async function buscarEvento(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!resposta.ok) {
      return null;
    }

    return await resposta.json();
  } catch (erro) {
    return null;
  }
}

export default async function DetalhesEvento({ params }) {
  const { id } = await params;
  const evento = await buscarEvento(id);

  if (!evento) {
    return (
      <main className="container py-5">
        <div className="detalhes-container text-center">
          <h1>Evento não encontrado</h1>
          <p>
            Não foi possível encontrar este evento.
            Confira o endereço ou tente novamente mais tarde.
          </p>

          <Link href="/eventos" className="btn btn-dourado">
            Voltar para eventos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <nav aria-label="Navegação estrutural" className="mb-4">
        <Link href="/" className="link-dourado">
          Início
        </Link>
        {" / "}
        <Link href="/eventos" className="link-dourado">
          Eventos
        </Link>
        {" / Detalhes"}
      </nav>

      <article className="detalhes-container">
        {evento.imagem && (
          <img
            src={evento.imagem}
            alt={`Imagem do evento ${evento.titulo}`}
            className="detalhes-imagem"
          />
        )}

        <div className="p-3 p-md-4">
          {evento.categoria && (
            <span className="categoria-evento">
              {evento.categoria}
            </span>
          )}

          <h1 className="detalhes-titulo mt-3">
            {evento.titulo}
          </h1>

          <p className="detalhes-descricao">
            {evento.descricao}
          </p>

          <hr />

          <div className="detalhes-informacao">
            <span className="icone-detalhes">▦</span>
            <div>
              <h2>Data do evento</h2>
              <p>{evento.data || "Data a definir"}</p>
            </div>
          </div>

          <div className="detalhes-informacao">
            <span className="icone-detalhes">⌖</span>
            <div>
              <h2>Local</h2>
              <p>{evento.local || "Local a definir"}</p>
            </div>
          </div>

          <Link
            href="/eventos"
            className="btn btn-dourado mt-3"
          >
            Voltar para eventos
          </Link>
        </div>
      </article>
    </main>
  );
}
