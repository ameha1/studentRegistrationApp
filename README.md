Student Registration CRUD Application

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


Project Structure : 

student-crud-app/
├── backend/
│   ├── uploads/            # Stores uploaded images
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   └── index.js        # Express server
│   ├── .env                # DB credentials
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── students/
│   │   │   ├── [id]/page.js  # Edit page
│   │   │   ├── add/page.js   # Add page
│   │   │   └── page.js       # List page
│   ├── components/
│   │   ├── StudentForm.js    # Form component
│   │   ├── StudentList.js    # Table component
|   |___src/components
│   │   └── ui/               # shadcn/ui components
│   ├── public/
│   │   └── placeholder.jpg   # Fallback image
│   ├── next.config.js        # Next.js config
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── postcss.config.js
├── .gitignore
└── README.md

Prerequisites

- Node.js (v22.7.0 or later)
- PostgreSQL (installed and running)
- Git (for cloning or version control)
- npm (comes with Node.js)

Setup Instructions

1. Clone the Repository

git clone <repository-url>
cd student-crud-app

2. Setup Backend
   
Navigate to backend/:

cd backend

Install dependencies:

npm install

Create uploads/ folder for images:
mkdir uploads
chmod 755 uploads


Configure PostgreSQL:

Start PostgreSQL (brew services start postgresql on macOS or equivalent).
- Create a database: createdb studentdb.
- Create .env with:
- DATABASE_URL="postgresql://user:password@localhost:5432/studentdb?schema=public"
- Replace user and password with your PostgreSQL credentials.

Run Prisma migrations:

npx prisma generate
npx prisma migrate dev --name init

Start backend:

- npm run dev
- Server runs on http://localhost:5000.

3. Setup Frontend

Navigate to frontend/:

cd ../frontend

Install dependencies:

npm install

Initialize shadcn/ui:

npx shadcn@latest init

Accept defaults or configure as needed.

Install shadcn/ui components:

npx shadcn@latest add button input label form table

Add a placeholder image:

Place a placeholder.jpg in frontend/public/ (e.g., download a generic avatar or use curl -o public/placeholder.jpg https://via.placeholder.com/40).

- Start frontend:

npm run dev

App runs on http://localhost:3000. (Note: Avoid next dev --turbopack if compatibility issues arise with shadcn/ui.)

4. Verify Setup

- Open http://localhost:3000/students in a browser.

- Add a student with an image (e.g., .jpg or .png).

- Verify the image displays in the list and edit page.

- Test edit and delete operations.

Usage :

- List Students: Visit /students to view all students in a table.

- Add Student: Go to /students/add, fill the form, and upload an image (optional).

- Edit Student: Click "Edit" on a student row, update details, and optionally upload a new image.

- Delete Student: Click "Delete" to remove a student (image cleanup is optional).

- Images are stored in backend/uploads/ and served via http://localhost:5000/uploads/<filename>.

