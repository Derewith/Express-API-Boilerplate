import Joi from 'joi'
import { Router } from 'express'

import { validate } from '../middlewares'
import * as demoCtrl from '../controllers/demo'

const CodiceFiscale = require('codice-fiscale-js')

const router = new Router()

const demoSchema = Joi.object().keys({
  test: Joi.string().required(),
})

/**
 * @param {String} query.test - test string
 * @return {String} - The query string as JSON
 */
router.get('/demo', validate(demoSchema, 'query'), demoCtrl.demo)

router.post('/generate_cv', (req, res) => {
  console.log('req', req.body)
  let name = req.body.name
  let surname = req.body.surname
  let gender = req.body.gender
  let day = req.body.day
  let month = req.body.month
  let year = req.body.year
  let birthplace = req.body.birthplace

  console.log('--[name]--', name)
  console.log('--[surname]--', surname)
  console.log('--[gender]--', gender)
  console.log('--[day]--', day)
  console.log('--[month]--', month)
  console.log('--[yearh]--', year)
  console.log('--[birthplace]--', birthplace)
  if (
    name !== undefined &&
    surname !== undefined &&
    gender !== undefined &&
    day !== undefined &&
    month !== undefined &&
    year !== undefined &&
    birthplace !== undefined
  ) {
    let cf = new CodiceFiscale({
      name: name,
      surname: surname,
      gender: gender, //F
      day: day,
      month: month,
      year: year,
      birthplace: birthplace,
    })

    console.log('-cf-', cf)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 200, ...cf }))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.status(404)
    res.end(JSON.stringify({ status: 404, error: 'Non posso creare il Codice Fiscale' }))
  }
})

export default router
