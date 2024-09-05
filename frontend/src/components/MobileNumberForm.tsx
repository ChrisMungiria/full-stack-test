import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNumberForm = () => {
  const [number, setNumber] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

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
      if (data) {
        return navigate("/home");
      }
    } catch (error: any) {
      if (error.message === "No user found") {
        alert("Hello there, it seems you're new here");
        return navigate("/addDetails");
      }
      console.log("Error in handleSubmitIDNumber: ", error.message);
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
        placeholder="Enter your mobile number"
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

export default MobileNumberForm;
