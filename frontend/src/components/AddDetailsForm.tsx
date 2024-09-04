import { FormEvent, useState } from "react";

// name, ID number, mobile number, and email address.
const AddDetailsForm = () => {
  // Form States
  const [name, setName] = useState<string>("");
  const [IdNumber, setIdNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //   Loading state
  const [submitting, setSubmitting] = useState<boolean>(false);

  //   Form Submit Handler
  const handleSubmitAddDetailsForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:8001/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          IdNumber,
          mobileNumber,
          email,
        }),
      });
      console.log("Response: ", response);
    } catch (error) {
      console.log("Error in handleSubmitAddDetailsForm: ", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmitAddDetailsForm}
      className="w-11/12 max-w-xs space-y-4"
    >
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded-md border border-slate-300 w-full focus:outline-none"
      />
      <input
        type="text"
        value={IdNumber}
        placeholder="Enter your ID Number"
        onChange={(e) => setIdNumber(e.target.value)}
        className="p-2 rounded-md border border-slate-300 w-full focus:outline-none"
      />
      <input
        type="text"
        value={mobileNumber}
        placeholder="Enter your mobile number"
        onChange={(e) => setMobileNumber(e.target.value)}
        className="p-2 rounded-md border border-slate-300 w-full focus:outline-none"
      />
      <input
        type="email"
        value={email}
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded-md border border-slate-300 w-full focus:outline-none"
      />
      <button
        type="submit"
        disabled={
          submitting ||
          name.length < 3 ||
          IdNumber.length < 3 ||
          email.length < 3 ||
          mobileNumber.length < 3
        }
        className={`p-2 flex items-center justify-center ${
          submitting ||
          name.length < 3 ||
          IdNumber.length < 3 ||
          email.length < 3 ||
          mobileNumber.length < 3
            ? "bg-blue-300"
            : "bg-blue-500"
        } text-white w-full rounded-md shadow-lg`}
      >
        {submitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default AddDetailsForm;
