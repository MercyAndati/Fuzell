import { NextResponse } from "next/server"

// Mock chat rooms database
const chatRooms = [
  {
    id: "1",
    name: "Sarah Johnson - E-commerce Project",
    participants: ["user1", "user2"],
    lastMessage: "Thanks for the update on the project progress!",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Mike Chen - Mobile App Design",
    participants: ["user1", "user3"],
    lastMessage: "The wireframes look great, let's proceed with the next phase.",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez - ML Project",
    participants: ["user1", "user4"],
    lastMessage: "Can we schedule a call to discuss the model performance?",
    unreadCount: 1,
  },
]

export async function GET() {
  try {
    return NextResponse.json({ rooms: chatRooms })
  } catch (error) {
    console.error("Error fetching chat rooms:", error)
    return NextResponse.json({ message: "Failed to fetch chat rooms" }, { status: 500 })
  }
}
