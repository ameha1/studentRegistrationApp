'use client'

import Link from 'next/link'
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
                <img src={student.profilePicture} alt="Profile" className="w-10 h-10" />
              ) : (
                'N/A'
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