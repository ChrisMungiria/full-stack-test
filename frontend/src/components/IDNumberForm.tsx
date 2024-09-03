import { FormEvent, useState } from "react";

const IDNumberForm = () => {
  const [number, setNumber] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmitIDNumber = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(
        `http://localhost:8001/api/getUser/${number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("No user found");
      }
      const data = await response.json();
      // TODO: This user has been here before
    } catch (error: any) {
      console.log("Error in handleSubmitIDNumber: ", error.message);
      if (error.message === "No user found") {
        // TODO: This user has not been here before, add their information
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmitIDNumber}
      className="w-11/12 max-w-xs space-y-4"
    >
      <input
        type="text"
        value={number}
        placeholder="Enter your ID Number"
        onChange={(e) => setNumber(e.target.value)}
        className="p-2 rounded-md border border-slate-300 w-full focus:outline-none"
      />
      <button
        type="submit"
        disabled={submitting || number.length < 3}
        className={`p-2 flex items-center justify-center ${
          submitting || number.length < 3 ? "bg-blue-300" : "bg-blue-500"
        } text-white w-full rounded-md shadow-lg`}
      >
        {submitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default IDNumberForm;
