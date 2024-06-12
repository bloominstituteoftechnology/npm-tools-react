let users
let id = 1
let getId = () => id++

const resetUsers = () => {
  id = 1
  users = [
    { id: getId(), username: 'Joe' },
    { id: getId(), username: 'Jane' },
  ]
}

resetUsers()

const getAll = () => {
  return users
}

const getById = id => {
  return users.find(user => user.id == id)
}

const create = user => {
  users.push({ id: getId(), username: user.username })
  return users
}

const remove = id => {
  users = users.filter(user => {
    return user.id != id
  })
  return users
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  resetUsers,
}
