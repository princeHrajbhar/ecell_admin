"use client";

import React, { useState } from "react";
import TeamMemberForm, { TeamMemberFormData as FormData } from "@/Components/TeamMember/Form"; // Import the form and the type
import { useRouter } from "next/navigation";

const CreateTeamMemberPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMember = async (formData: FormData) => { // Use FormData directly
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/teamMembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create team member");
      }

      router.push("/members");
    } catch (error) {
      console.error("Error creating team member:", error);
      setError("An error occurred while creating the team member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-3xl">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <TeamMemberForm
          onSubmit={handleCreateMember}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateTeamMemberPage;