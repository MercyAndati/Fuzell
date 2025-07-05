import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, jobDescription, skills, freelancerProfile } = await request.json()

    // For now, generate a mock proposal since OpenAI API key is not configured
    // In production, you would use: const { generateText } = require('ai') and OpenAI

    const mockProposal = `Dear Client,

I am excited to apply for the ${jobTitle} position. After carefully reviewing your project requirements, I believe I am the perfect fit for this role.

**Why I'm the Right Choice:**
• Extensive experience with ${skills.slice(0, 3).join(", ")}
• Proven track record in similar projects
• Strong attention to detail and commitment to quality
• Excellent communication and project management skills

**My Approach:**
I will start by thoroughly understanding your specific requirements and then create a detailed project plan. My methodology includes regular updates, milestone deliveries, and continuous client feedback integration.

**What You Can Expect:**
✓ High-quality deliverables on time
✓ Regular progress updates
✓ Professional communication throughout
✓ Post-delivery support and revisions

I am confident that my skills and experience make me an ideal candidate for this project. I would love to discuss your requirements in more detail and answer any questions you may have.

Looking forward to working with you!

Best regards,
[Your Name]

P.S. I am available to start immediately and can dedicate full attention to your project.`

    return NextResponse.json({ proposal: mockProposal })
  } catch (error) {
    console.error("Proposal generation error:", error)
    return NextResponse.json({ message: "Failed to generate proposal" }, { status: 500 })
  }
}
