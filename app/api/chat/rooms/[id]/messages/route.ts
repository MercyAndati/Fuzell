import { type NextRequest, NextResponse } from "next/server"

// Mock messages database
const messages: { [roomId: string]: any[] } = {
  "1": [
    {
      id: "1",
      senderId: "user2",
      senderName: "Sarah Johnson",
      content: "Hi! I'm excited to work with you on this e-commerce project.",
      timestamp: "2024-01-10T10:00:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "user1",
      senderName: "John Doe",
      content: "Thank you! I've reviewed the requirements and I'm ready to get started.",
      timestamp: "2024-01-10T10:05:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "user2",
      senderName: "Sarah Johnson",
      content: "Great! When can you start working on the initial wireframes?",
      timestamp: "2024-01-10T10:10:00Z",
      type: "text",
    },
  ],
  "2": [
    {
      id: "4",
      senderId: "user3",
      senderName: "Mike Chen",
      content: "The design concepts you shared look fantastic!",
      timestamp: "2024-01-08T14:30:00Z",
      type: "text",
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const roomMessages = messages[params.id] || []
    return NextResponse.json({ messages: roomMessages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ message: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { content } = await request.json()

    const newMessage = {
      id: Date.now().toString(),
      senderId: "user1", // In real app, get from JWT token
      senderName: "Current User",
      content,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    if (!messages[params.id]) {
      messages[params.id] = []
    }

    messages[params.id].push(newMessage)

    return NextResponse.json({ message: newMessage }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
  }
}
