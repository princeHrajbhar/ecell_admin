"use client";

import React, { useEffect, useState } from "react";
import TeamMemberForm, { TeamMemberFormData } from "@/Components/TeamMember/Form"; // Import the type
import { useRouter, useParams } from "next/navigation"; // Import useParams
import axios from "axios";

// Define the type for a team member
interface TeamMember {
  _id: string;
  memberName: string;
  memberId: string;
  description: string;
  position: string;
  image: string;
  email: string; // Added email
  phone: string; // Added phone
  address: string; // Added address
  gitUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

const EditTeamMemberPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingMember, setExistingMember] = useState<TeamMember | null>(null); // Use the defined type

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) return; // Check if id is available

      try {
        const response = await axios.get(`/api/teamMembers/${id}`);
        setExistingMember(response.data);
      } catch (error) {
        setError("Failed to fetch team member data.");
        console.error(error); // Log the error for debugging
      }
    };

    fetchMemberData();
  }, [id]);

  const handleUpdateMember = async (formData: TeamMemberFormData ) => { // Use the defined type
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/teamMembers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, _id: id }), // Include _id in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to update team member");
      }

      router.push("/members"); // Redirect to the team members list
    } catch (error) {
      setError("An error occurred while updating the team member. Please try again.");
      console.error(error); // Log the error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching member data
  if (!existingMember) {
    return <div className="text-center text-blue-500">Loading member data...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-3xl">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <TeamMemberForm
          existingMember={existingMember} // Pass the fetched member data to the form
          onSubmit={handleUpdateMember}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditTeamMemberPage;