const express = require('express')
const router = express.Router()
const Player = require('../models/player')

// Getting all
router.get('/', async (req, res) => {
  try {
    const players = await Player.find()
    res.json(players)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getPlayer, (req, res) => {
  res.json(res.Player)
})

// Creating one
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    signedToTeam: req.body.signedToTeam
  })
  try {
    const newTeam = await player.save()
    res.status(201).json(newTeam)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getPlayer, async (req, res) => {
  if (req.body.name != null) {
    res.player.name = req.body.name
  }
  if (req.body.signedToTeam != null) {
    res.player.signedToTeam = req.body.signedToTeam
  }
  try {
    const updatedPlayer = await res.player.save()
    res.json(updatedPlayer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getPlayer, async (req, res) => {
  try {
    await res.player.remove()
    res.json({ message: 'Deleted Player' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPlayer(req, res, next) {
  let player
  try {
    player = await Player.findById(req.params.id)
    if (player == null) {
      return res.status(404).json({ message: 'Cannot find player' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.player = player
  next()
}

module.exports = router