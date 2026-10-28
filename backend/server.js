
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Céu de Letras funcionando!",
  });
});

// LISTAR TODOS OS EVENTOS
app.get("/api/eventos", async (req, res) => {
  try {
    const [eventos] = await db.query(
      "SELECT * FROM eventos ORDER BY data_evento ASC"
    );

    res.json(eventos);
  } catch (erro) {
    console.error("Erro ao listar eventos:", erro);

    res.status(500).json({
      erro: "Não foi possível buscar os eventos.",
    });
  }
});

// BUSCAR UM EVENTO PELO ID
app.get("/api/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [eventos] = await db.query(
      "SELECT * FROM eventos WHERE id = ?",
      [id]
    );

    if (eventos.length === 0) {
      return res.status(404).json({
        erro: "Evento não encontrado.",
      });
    }

    res.json(eventos[0]);
  } catch (erro) {
    console.error("Erro ao buscar evento:", erro);

    res.status(500).json({
      erro: "Não foi possível buscar o evento.",
    });
  }
});

// CADASTRAR UM EVENTO
app.post("/api/eventos", async (req, res) => {
  try {
    const {
      titulo,
      categoria,
      data_evento,
      horario,
      local,
      descricao,
      imagem,
    } = req.body;

    if (
      !titulo?.trim() ||
      !categoria?.trim() ||
      !data_evento ||
      !local?.trim() ||
      !descricao?.trim()
    ) {
      return res.status(400).json({
        erro: "Preencha todos os campos obrigatórios.",
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO eventos
      (titulo, categoria, data_evento, horario, local, descricao, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo.trim(),
        categoria.trim(),
        data_evento,
        horario || null,
        local.trim(),
        descricao.trim(),
        imagem || null,
      ]
    );

    res.status(201).json({
      mensagem: "Evento cadastrado com sucesso!",
      id: resultado.insertId,
    });
  } catch (erro) {
    console.error("Erro ao cadastrar evento:", erro);

    res.status(500).json({
      erro: "Não foi possível cadastrar o evento.",
    });
  }
});

// ATUALIZAR UM EVENTO
app.put("/api/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      titulo,
      categoria,
      data_evento,
      horario,
      local,
      descricao,
      imagem,
    } = req.body;

    if (
      !titulo?.trim() ||
      !categoria?.trim() ||
      !data_evento ||
      !local?.trim() ||
      !descricao?.trim()
    ) {
      return res.status(400).json({
        erro: "Preencha todos os campos obrigatórios.",
      });
    }

    const [resultado] = await db.query(
      `UPDATE eventos
       SET titulo = ?,
           categoria = ?,
           data_evento = ?,
           horario = ?,
           local = ?,
           descricao = ?,
           imagem = ?
       WHERE id = ?`,
      [
        titulo.trim(),
        categoria.trim(),
        data_evento,
        horario || null,
        local.trim(),
        descricao.trim(),
        imagem || null,
        id,
      ]
    );

    if (resultado.affectedRows === 0) {
      const [eventos] = await db.query(
        "SELECT id FROM eventos WHERE id = ?",
        [id]
      );

      if (eventos.length === 0) {
        return res.status(404).json({
          erro: "Evento não encontrado.",
        });
      }
    }

    res.json({
      mensagem: "Evento atualizado com sucesso!",
    });
  } catch (erro) {
    console.error("Erro ao atualizar evento:", erro);

    res.status(500).json({
      erro: "Não foi possível atualizar o evento.",
    });
  }
});

// EXCLUIR UM EVENTO
app.delete("/api/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      "DELETE FROM eventos WHERE id = ?",
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: "Evento não encontrado.",
      });
    }

    res.json({
      mensagem: "Evento excluído com sucesso!",
    });
  } catch (erro) {
    console.error("Erro ao excluir evento:", erro);

    res.status(500).json({
      erro: "Não foi possível excluir o evento.",
    });
  }
});

// INICIAR O SERVIDOR
async function iniciarServidor() {
  try {
    // Testa a conexão com o MySQL antes de iniciar a API
    const conexao = await db.getConnection();

    console.log("Conexão com MySQL estabelecida!");
    conexao.release();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Não foi possível conectar ao MySQL:", erro.message);
    process.exitCode = 1;
  }
}

iniciarServidor();
