const router = require('express').Router()
const Yup = require('yup')

let id = 1
const getNextId = () => id++
const catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx']
let cats = [
  {
    id: getNextId(),
    name: "Luna",
    breed: "Siamese",
    isNinja: true
  },
  {
    id: getNextId(),
    name: "Oliver",
    breed: "Persian",
    isNinja: false
  },
  {
    id: getNextId(),
    name: "Leo",
    breed: "Maine Coon",
    isNinja: false
  },
]

router.get('/breeds', (_, res) => {
  res.json(catBreeds)
})

router.get('/', (_, res) => {
  res.json(cats)
})

router.delete('/:id', (req, res, next) => {
  const cat = cats.find(ct => ct.id == req.params.id)
  if (!cat) {
    return next({ status: 404, message: 'Cat not found' })
  }
  cats = cats.filter(ct => ct.id != req.params.id)
  res.json(cat)
})

const putSchema = Yup.object().shape({
  name: Yup.string().nullable().min(3),
  breed: Yup.string().oneOf(catBreeds, `Breed must be one of: ${catBreeds.join(', ')}`).nullable(),
  isNinja: Yup.boolean().nullable(),
})
  .test(
    'at-least-one-field',
    'Provide properties to update',
    function (obj) {
      return obj.name != null ||
        obj.breed != null ||
        obj.isNinja != null
    }
  )

router.put('/:id', async (req, res, next) => {
  const cat = cats.find(ct => ct.id == req.params.id)
  if (!cat) {
    return next({ status: 404, message: 'Cat not found' })
  }
  try {
    const {
      name,
      breed,
      isNinja,
    } = await putSchema.validate(req.body, { stripUnknown: true })
    if (name) cat.name = name
    if (breed) cat.breed = breed
    if (isNinja !== undefined) cat.isNinja = isNinja
    res.json(cat)
  } catch ({ message }) {
    return next({ status: 422, message })
  }
})

const postSchema = Yup.object().shape({
  name: Yup.string().required('`name` required').min(3, 'Name too short'),
  breed: Yup.string().required('`breed` required').oneOf(catBreeds, `Breed must be one of: ${catBreeds.join(', ')}`),
  isNinja: Yup.boolean().nullable(),
})

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      breed,
      isNinja,
    } = await postSchema.validate(req.body, { stripUnknown: true })
    const newCat = { id: getNextId(), name, breed, isNinja: isNinja ?? false }
    cats.push(newCat)
    res.status(201).json(newCat)
  } catch ({ message }) {
    return next({ status: 422, message })
  }
})

module.exports = router
