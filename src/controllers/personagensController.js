import {
  getAll,
  getById,
  create,
  update,
  remove,
  isValidId
} from '../models/personagensModel.js'

const isNonEmptyString = (valor) => typeof valor === 'string' && valor.trim()

const validarPersonagem = (req, res) => {
  const { nome, imagem } = req.body

  if (!isNonEmptyString(nome) || !isNonEmptyString(imagem)) {
    res.status(400).send('Informe nome e imagem validos.')
    return false
  }

  return true
}

const obterId = (req, res) => {
  const id = req.params.id

  if (!isValidId(id)) {
    res.status(404).send('Personagem nao encontrado.')
    return null
  }

  return id
}

const listar = async (req, res) => {
  const personagens = await getAll()
  res.send(personagens)
}

const buscarPorId = async (req, res) => {
  const id = obterId(req, res)

  if (!id) return

  const personagem = await getById(id)
  if (!personagem) {
    res.status(404).send('Personagem nao encontrado.')
    return
  }
  res.send(personagem)
}

const criar = async (req, res) => {
  if (!validarPersonagem(req, res)) return

  const novoId = await create({
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  res.status(201).send({ message: 'Novo personagem adicionado com sucesso!', id: novoId })
}

const atualizar = async (req, res) => {
  const id = obterId(req, res)
  if (!id) return

  if (!validarPersonagem(req, res)) return

  const atualizado = await update(id, {
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  if (!atualizado) {
    res.status(404).send('Personagem nao encontrado para atualizar.')
    return
  }

  res.send('Personagem atualizado com sucesso!')
}

const remover = async (req, res) => {
  const id = obterId(req, res)
  if (!id) return

  const ok = await remove(id)
  if (!ok) {
    res.status(404).send('Personagem nao encontrado para remover.')
    return
  }

  res.send('Personagem removido com sucesso!')
}

export { listar, buscarPorId, criar, atualizar, remover }
