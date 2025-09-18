// src/index.js
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'
import z from 'zod'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()
const app = express()
const PORT = 5000

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors())
app.use(bodyParser.json()) // Still use for non-multipart routes

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// Validation schema
const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  age: z.coerce.number().int().min(1, 'Age must be positive'),
  profilePicture: z.string().optional(),
})

// Routes
app.get('/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/students/:id', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/students', upload.single('profilePicture'), async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      profilePicture: req.file ? req.file.filename : null,
    }
    const validatedData = studentSchema.parse(data)
    const student = await prisma.student.create({ data: validatedData })
    res.status(201).json(student)
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.errors })
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/students/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const existing = await prisma.student.findUnique({ where: { id } })
    if (!existing) return res.status(404).json({ error: 'Student not found' })

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      profilePicture: req.file ? req.file.filename : existing.profilePicture,
    }
    const validatedData = studentSchema.parse(data)
    const student = await prisma.student.update({ where: { id }, data: validatedData })
    res.json(student)
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.errors })
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/students/:id', async (req, res) => {
  try {
    await prisma.student.delete({ where: { id: parseInt(req.params.id) } })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
