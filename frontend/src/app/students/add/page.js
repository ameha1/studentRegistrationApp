'use client'

import StudentForm from '../../../../components/StudentForm'
import { useRouter } from 'next/navigation'

export default function AddStudent() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('age', data.age)
    if (data.profilePicture) formData.append('profilePicture', data.profilePicture)

    await fetch('http://localhost:5000/students', {
      method: 'POST',
      body: formData,
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