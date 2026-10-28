
const API_URL = "http://localhost:3001/api/eventos";

async function buscarEventos() {
  try {
    const resposta = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar eventos.");
    }

    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao carregar eventos:", erro);
    return null;
  }
}

function formatarData(data) {
  if (!data) return "Data a definir";

  // Trata a data YYYY-MM-DD sem problemas de fuso horário.
  const dataTexto =
    typeof data === "string"
      ? data.slice(0, 10)
      : "";

  const partes = dataTexto.split("-");

  if (partes.length !== 3) {
    return dataTexto || "Data a definir";
  }

  const [ano, mes, dia] = partes;

  return new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia)
  ).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Eventos() {
  const eventos = await buscarEventos();

  return (
    <main className="container py-5">
      <section className="banner p-4 p-md-5 mb-5 rounded-3">
        <h1 className="display-5 fw-bold">
          Eventos literários
        </h1>

        <p className="col-md-8 fs-5">
          Descubra encontros, poesias e histórias
          que aproximam pessoas por meio das palavras.
        </p>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="titulo-secao">
            Próximos eventos
          </h2>

          <p className="text-secondary mb-0">
            Encontre seu próximo encontro literário.
          </p>
        </div>

        {eventos === null ? (
          <div className="alert alert-danger" role="alert">
            Não foi possível carregar os eventos.
            Verifique se a API e o banco de dados estão funcionando.
          </div>
        ) : eventos.length === 0 ? (
          <p className="alert alert-info">
            Ainda não há eventos cadastrados.
          </p>
        ) : (
          <div className="row g-4">
            {eventos.map((evento) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={evento.id}
              >
                <article className="card card-evento h-100">
                  {evento.imagem && (
                    <img
                      src={evento.imagem}
                      className="card-img-top imagem-evento"
                      alt={evento.titulo}
                    />
                  )}

                  <div className="card-body d-flex flex-column">
                    {evento.categoria && (
                      <span className="categoria-evento">
                        {evento.categoria}
                      </span>
                    )}

                    <h3 className="card-title h5 mt-3">
                      {evento.titulo}
                    </h3>

                    <p className="informacao-evento">
                      <strong>Data:</strong>{" "}
                      {formatarData(
                        evento.data_evento ?? evento.data
                      )}
                    </p>

                    <p className="informacao-evento">
                      <strong>Local:</strong>{" "}
                      {evento.local}
                    </p>

                    <p className="card-text descricao-evento">
                      {evento.descricao}
                    </p>

                    <a
                      href={`/eventos/${evento.id}`}
                      className="btn btn-evento mt-auto"
                    >
                      Ver detalhes
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
