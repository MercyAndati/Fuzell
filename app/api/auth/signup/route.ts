import { type NextRequest, NextResponse } from "next/server"

// Persistent user storage (in production, use MongoDB)
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password",
    role: "freelancer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password",
    role: "client",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@test.com",
    password: "password",
    role: "freelancer",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@test.com",
    password: "password",
    role: "client",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    console.log("Fuzell - Signup attempt for:", email, "with role:", role)

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // Store plain password for development
      role,
    }

    users.push(newUser)
    console.log("Fuzell - User created successfully:", email)
    console.log("Total users now:", users.length)

    // Create a simple token (in production, use proper JWT)
    const token = `fuzell_token_${newUser.id}_${Date.now()}`

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Fuzell - Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Export users for use in login route
export { users }
