
import styles from "../page.module.css";

const eventos = [
  {
    id: 1,
    titulo: "Noite de Poesia",
    categoria: "Poesia",
    data: "28 de outubro de 2026",
    local: "Biblioteca Municipal",
    descricao:
      "Uma noite dedicada à declamação de poemas e à expressão artística.",
    imagem: "/eventos/noite-poesia.jpg",
  },
  {
    id: 2,
    titulo: "Encontro Literário",
    categoria: "Literatura",
    data: "5 de novembro de 2026",
    local: "Centro Cultural",
    descricao:
      "Um espaço para compartilhar leituras e conversar sobre grandes obras.",
    imagem: "/eventos/encontro-literario.jpg",
  },
  {
    id: 3,
    titulo: "Lançamento de Livros",
    categoria: "Lançamento",
    data: "12 de novembro de 2026",
    local: "Casa da Cultura",
    descricao:
      "Conheça novos autores e suas obras em um encontro especial.",
    imagem: "/eventos/lancamento.jpg",
  },
];

export default function Home() {
  return (
    <>
      <section className="container py-5">
        <div className="banner p-4 p-md-5 mb-5 rounded-3">
          <h1 className="display-5 fw-bold">
            Eventos literários
          </h1>

          <p className="col-md-8 fs-5">
            Descubra encontros, poesias e histórias
            que aproximam pessoas por meio das palavras.
          </p>
        </div>

        <div className="d-flex justify-content-between
          align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="titulo-secao">
              Próximos eventos
            </h2>
            <p className="text-secondary mb-0">
              Encontre seu próximo encontro literário.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {eventos.map((evento) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={evento.id}
            >
              <article className="card card-evento h-100">
                <img
                  src={evento.imagem}
                  className="card-img-top imagem-evento"
                  alt={evento.titulo}
                />

                <div className="card-body d-flex flex-column">
                  <span className="categoria-evento">
                    {evento.categoria}
                  </span>

                  <h3 className="card-title h5 mt-3">
                    {evento.titulo}
                  </h3>

                  <p className="informacao-evento">
                    <strong>Data:</strong> {evento.data}
                  </p>

                  <p className="informacao-evento">
                    <strong>Local:</strong> {evento.local}
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
      </section>
    </>
  );
}
