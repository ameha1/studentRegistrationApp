# studentRegistrationApp
This is a full-stack web application for managing student records with CRUD (Create, Read, Update, Delete) functionality. It allows users to add, edit, list, and delete students, including uploading profile pictures. The app features client and server-side validation, a responsive UI, and image handling.

Features:

- List Students: Display all students in a table with ID, name, email, age, and profile picture.
- Add/Edit Students: Form with validation for adding or updating student details and uploading images.
- Delete Students: Remove students with optional image cleanup.
- Image Uploads: Upload profile pictures, stored on the server with unique filenames.
- Validation: Client and server-side validation using Zod.

Technologies

Frontend:

- Next.js (15.5.3)
- React (18.3.1)
- shadcn/ui (with Tailwind CSS, Radix UI)
- react-hook-form (7.53.0), Zod (3.23.8)
- Lucide React (icons)


Backend:

- Node.js (22.7.0)
- Express (4.18.2)
- Prisma (5.3.1)
- PostgreSQL
- Multer (1.4.5-lts.1), UUID (9.0.1), Zod (3.22.2)

Other: Git, TypeScript (optional), Turbopack (optional)



