import { useState } from "react";

const InviteForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({
          query: `
            mutation InviteFriend($email: String!) {
              inviteFriend(email: $email) {
                message
              }
            }
          `,
          variables: { email },
        }),
      });

      const result = await response.json();

      if (result.data?.inviteFriend?.message) {
        setStatus(result.data.inviteFriend.message);
        setEmail("");
      } else {
        throw new Error("Invite failed");
      }
    } catch (error) {
      setStatus("Error sending invite.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Friend's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Send Invite
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
};

export default InviteForm;
