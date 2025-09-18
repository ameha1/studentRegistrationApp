'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, Edit } from 'lucide-react'

export default function StudentList({ students, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Profile Picture</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map(student => (
          <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.lastName}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.age}</TableCell>
            <TableCell>
              {student.profilePicture ? (
                <Image
                  src={`http://localhost:5000/uploads/${student.profilePicture}`}
                  alt={`${student.firstName}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg' // Fallback
                  }}
                />
              ) : (
                <Image
                  src="/placeholder.jpg"
                  alt="No profile picture"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
            </TableCell>
            <TableCell>
              <Link href={`/students/${student.id}`}>
                <Button variant="ghost"><Edit size={16} /></Button>
              </Link>
              <Button variant="ghost" onClick={() => onDelete(student.id)}><Trash2 size={16} /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}