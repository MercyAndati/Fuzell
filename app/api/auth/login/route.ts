import { type NextRequest, NextResponse } from "next/server"

// Import users from signup route to maintain persistence
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
    const { email, password } = await request.json()

    console.log("Fuzell - Login attempt for:", email)
    console.log(
      "Available users:",
      users.map((u) => u.email),
    )

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Simple password check for development
    if (password !== user.password) {
      console.log("Invalid password for:", email)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    console.log("Fuzell - Login successful for:", email)

    // Create a simple token (in production, use proper JWT)
    const token = `fuzell_token_${user.id}_${Date.now()}`

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Fuzell - Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
