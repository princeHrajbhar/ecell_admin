import { NextRequest, NextResponse } from 'next/server';

// Sample data (this would typically come from a database)
const teamMembers = [
  { id: '1', name: 'Prince Rajbhar', role: 'Team Leader' },
  { id: '2', name: 'Mukul Rajput', role: 'Data Analyst' },
  // Add more team members as needed
];

// Handle GET and POST requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Find a specific team member by ID
    const member = teamMembers.find((m) => m.id === id);
    if (member) {
      return NextResponse.json(member);
    }
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
  }

  // Return all team members if no ID is provided
  return NextResponse.json(teamMembers);
}

export async function POST(request: NextRequest) {
  const newMember = await request.json();

  // Simple validation
  if (!newMember || !newMember.name || !newMember.role) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Add a new team member (in practice, this would involve saving to a database)
  const id = (teamMembers.length + 1).toString();
  const createdMember = { id, ...newMember };
  teamMembers.push(createdMember);

  return NextResponse.json(createdMember, { status: 201 });
}
