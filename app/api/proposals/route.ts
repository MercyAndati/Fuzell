import { type NextRequest, NextResponse } from "next/server"

// Mock proposals database
const proposals: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { jobId, proposal, bidAmount } = await request.json()

    const newProposal = {
      id: (proposals.length + 1).toString(),
      jobId,
      proposal,
      bidAmount,
      submittedAt: new Date().toISOString(),
      status: "pending",
    }

    proposals.push(newProposal)

    return NextResponse.json({ proposal: newProposal }, { status: 201 })
  } catch (error) {
    console.error("Error submitting proposal:", error)
    return NextResponse.json({ message: "Failed to submit proposal" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ proposals })
  } catch (error) {
    console.error("Error fetching proposals:", error)
    return NextResponse.json({ message: "Failed to fetch proposals" }, { status: 500 })
  }
}
