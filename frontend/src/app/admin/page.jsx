
"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/api/eventos";

const formularioInicial = {
  titulo: "",
  categoria: "",
  data_evento: "",
  horario: "",
  local: "",
  descricao: "",
  imagem: "",
};

export default function Admin() {
  const [eventos, setEventos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEditando, setIdEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // Buscar eventos da API
  async function carregarEventos() {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os eventos.");
      }

      const dados = await resposta.json();
      setEventos(dados);
    } catch (erro) {
      setErro(
        erro.message || "Erro ao conectar com o servidor."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  // Atualizar os campos do formulário
  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // Limpar o formulário
  function limparFormulario() {
    setFormulario(formularioInicial);
    setIdEditando(null);
    setMensagem("");
    setErro("");
  }

  // Cadastrar ou atualizar um evento
  async function salvarEvento(event) {
    event.preventDefault();

    setMensagem("");
    setErro("");
    setSalvando(true);

    try {
      const editando = idEditando !== null;

      const url = editando
        ? `${API_URL}/${idEditando}`
        : API_URL;

      const metodo = editando ? "PUT" : "POST";

      const dados = {
        ...formulario,
        horario: formulario.horario || null,
        imagem: formulario.imagem.trim() || null,
      };

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível salvar o evento."
        );
      }

      setMensagem(
        editando
          ? "Evento atualizado com sucesso!"
          : "Evento cadastrado com sucesso!"
      );

      setFormulario(formularioInicial);
      setIdEditando(null);

      await carregarEventos();
    } catch (erro) {
      setErro(
        erro.message || "Erro ao salvar o evento."
      );
    } finally {
      setSalvando(false);
    }
  }

  // Preencher formulário para edição
  function editarEvento(evento) {
    setIdEditando(evento.id);

    setFormulario({
      titulo: evento.titulo || "",
      categoria: evento.categoria || "",
      data_evento: evento.data_evento
        ? String(evento.data_evento).slice(0, 10)
        : "",
      horario: evento.horario
        ? String(evento.horario).slice(0, 5)
        : "",
      local: evento.local || "",
      descricao: evento.descricao || "",
      imagem: evento.imagem || "",
    });

    setMensagem("");
    setErro("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Excluir evento
  async function excluirEvento(id) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir este evento?"
    );

    if (!confirmar) return;

    setMensagem("");
    setErro("");

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível excluir o evento."
        );
      }

      setMensagem("Evento excluído com sucesso!");

      if (idEditando === id) {
        setFormulario(formularioInicial);
        setIdEditando(null);
      }

      await carregarEventos();
    } catch (erro) {
      setErro(
        erro.message || "Erro ao excluir o evento."
      );
    }
  }

  // Formatar a data para exibição
  function formatarData(data) {
    if (!data) return "Data a definir";

    const texto = String(data).slice(0, 10);
    const partes = texto.split("-");

    if (partes.length !== 3) return texto;

    const [ano, mes, dia] = partes;

    return new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    ).toLocaleDateString("pt-BR");
  }

  return (
    <main className="container py-5 admin-pagina">
      <header className="mb-5">
        <h1 className="admin-titulo">
          Administração de eventos
        </h1>

        <p className="text-secondary">
          Cadastre, consulte, edite e exclua eventos
          do Céu de Letras.
        </p>
      </header>

      {mensagem && (
        <div className="alert alert-success" role="status">
          {mensagem}
        </div>
      )}

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {/* FORMULÁRIO */}
      <section className="admin-formulario mb-5">
        <h2 className="admin-subtitulo mb-4">
          {idEditando !== null
            ? "Editar evento"
            : "Cadastrar novo evento"}
        </h2>

        <form onSubmit={salvarEvento}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="titulo" className="form-label">
                Título *
              </label>

              <input
                id="titulo"
                name="titulo"
                className="form-control"
                value={formulario.titulo}
                onChange={atualizarCampo}
                maxLength={150}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="categoria" className="form-label">
                Categoria *
              </label>

              <select
                id="categoria"
                name="categoria"
                className="form-select"
                value={formulario.categoria}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Poesia">Poesia</option>
                <option value="Literatura">Literatura</option>
                <option value="Lançamento">Lançamento</option>
                <option value="Oficina">Oficina</option>
                <option value="Sarau">Sarau</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="data_evento" className="form-label">
                Data *
              </label>

              <input
                id="data_evento"
                name="data_evento"
                type="date"
                className="form-control"
                value={formulario.data_evento}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="horario" className="form-label">
                Horário
              </label>

              <input
                id="horario"
                name="horario"
                type="time"
                className="form-control"
                value={formulario.horario}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-12">
              <label htmlFor="local" className="form-label">
                Local *
              </label>

              <input
                id="local"
                name="local"
                className="form-control"
                value={formulario.local}
                onChange={atualizarCampo}
                maxLength={150}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="descricao" className="form-label">
                Descrição *
              </label>

              <textarea
                id="descricao"
                name="descricao"
                className="form-control"
                rows="4"
                value={formulario.descricao}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="imagem" className="form-label">
                Caminho da imagem
              </label>

              <input
                id="imagem"
                name="imagem"
                className="form-control"
                placeholder="/eventos/noite-poesia.jpg"
                value={formulario.imagem}
                onChange={atualizarCampo}
              />

              <div className="form-text">
                Informe o caminho de uma imagem que esteja
                disponível publicamente no site.
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-dourado"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : idEditando !== null
                  ? "Salvar alterações"
                  : "Cadastrar evento"}
            </button>

            {idEditando !== null && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={limparFormulario}
                disabled={salvando}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      {/* LISTA DE EVENTOS */}
      <section>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h2 className="admin-subtitulo mb-0">
            Eventos cadastrados
          </h2>

          <button
            type="button"
            className="btn btn-outline-dourado"
            onClick={carregarEventos}
            disabled={carregando}
          >
            Atualizar lista
          </button>
        </div>

        {carregando ? (
          <p>Carregando eventos...</p>
        ) : eventos.length === 0 ? (
          <div className="alert alert-info">
            Nenhum evento cadastrado no banco de dados.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle admin-tabela">
              <thead>
                <tr>
                  <th scope="col">Evento</th>
                  <th scope="col">Data</th>
                  <th scope="col">Local</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>

              <tbody>
                {eventos.map((evento) => (
                  <tr key={evento.id}>
                    <td>
                      <strong>{evento.titulo}</strong>
                      <br />
                      <small className="text-secondary">
                        {evento.categoria}
                      </small>
                    </td>

                    <td>{formatarData(evento.data_evento)}</td>

                    <td>{evento.local}</td>

                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dourado"
                          onClick={() => editarEvento(evento)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => excluirEvento(evento.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
