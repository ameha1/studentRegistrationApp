'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import StudentList from '../../../components/StudentList'
import { Button } from '@/components/ui/button'

export default function Students() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(setStudents)
      .catch(console.error)
  }, [])

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' })
    setStudents(students.filter(s => s.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <Link href="/students/add">
        <Button>Add Student</Button>
      </Link>
      <StudentList students={students} onDelete={handleDelete} />
    </div>
  )
}