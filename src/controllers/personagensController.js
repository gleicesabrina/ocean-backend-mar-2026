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

const obterId = async (req, res) => {
  const id = req.params.id

  if (!isValidId(id)) {
    res.status(404).send('Personagem nao encontrado.')
    return null
  }

  const personagem = await getById(id)

  if (!personagem) {
    res.status(404).send('Personagem nao encontrado.')
    return null
  }

  return id
}

const listar = async (req, res) => {
  res.send(await getAll())
}

const buscarPorId = async (req, res) => {
  const id = await obterId(req, res)

  if (!id) {
    return
  }

  res.send(await getById(id))
}

const criar = async (req, res) => {
  if (!validarPersonagem(req, res)) {
    return
  }

  await create({
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  res.send('Novo personagem adicionado com sucesso!')
}

const atualizar = async (req, res) => {
  const id = await obterId(req, res)

  if (!id) {
    return
  }

  if (!validarPersonagem(req, res)) {
    return
  }

  await update(id, {
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  res.send('Personagem atualizado com sucesso!')
}

const remover = async (req, res) => {
  const id = await obterId(req, res)

  if (!id) {
    return
  }

  await remove(id)

  res.send('Personagem removido com sucesso!')
}

export { listar, buscarPorId, criar, atualizar, remover }
