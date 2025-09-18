'use client'

import StudentForm from '../../../../components/StudentForm'
import { useRouter } from 'next/navigation'

export default function AddStudent() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    router.push('/students')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  )
}