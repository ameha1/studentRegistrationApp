'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import StudentForm from '@/components/StudentForm'

export default function EditStudent() {
  const [student, setStudent] = useState(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/students/${params.id}`)
      .then(res => res.json())
      .then(setStudent)
      .catch(console.error)
  }, [params.id])

  const handleSubmit = async (data) => {
    await fetch(`http://localhost:5000/students/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    router.push('/students')
  }

  if (!student) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Student</h1>
      <StudentForm initialData={student} onSubmit={handleSubmit} />
    </div>
  )
}