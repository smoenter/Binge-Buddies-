import { useState } from "react";
import "./InviteForm.css"

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        className="invite-input"
      />
      <button type="submit" className="invite-button">
        Send Invite
      </button>
      {status && <p className="invite-status">{status}</p>}
    </form>
  );
};

export default InviteForm;
