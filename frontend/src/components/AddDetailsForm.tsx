import { FormEvent, useState } from "react";
import TermsAndConditions from "./TermsAndConditions";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

// name, ID number, mobile number, and email address.
const AddDetailsForm = () => {
  // Form States
  const [name, setName] = useState<string>("");
  const [IdNumber, setIdNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  //   Loading state
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Navigator
  const navigate = useNavigate();

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
      const data = await response.json();
      const userID = data._id;
      alert("Nice to meet you, I hope we'll be seeing more of you soon");
      navigate(`/home/${userID}`);
    } catch (error) {
      console.log("Error in handleSubmitAddDetailsForm: ", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmitAddDetailsForm} className="w-11/12 max-w-xs ">
      <div className="space-y-4">
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
          type="button"
          className={`${
            termsAccepted ? "text-green-500" : "text-blue-500"
          } flex items-center gap-2`}
          onClick={() => {
            if (!termsAccepted) {
              setShowTerms(true);
            }
          }}
        >
          Terms and conditions{" "}
          {termsAccepted && <CiCircleCheck size={25} color="green" />}
        </button>
        <button
          type="submit"
          disabled={
            submitting ||
            name.length < 3 ||
            IdNumber.length < 3 ||
            email.length < 3 ||
            mobileNumber.length < 3 ||
            !termsAccepted
          }
          className={`p-2 flex items-center justify-center ${
            submitting ||
            name.length < 3 ||
            IdNumber.length < 3 ||
            email.length < 3 ||
            mobileNumber.length < 3 ||
            !termsAccepted
              ? "bg-blue-300"
              : "bg-blue-500"
          } text-white w-full rounded-md shadow-lg`}
        >
          {submitting ? "Submitting" : "Submit"}
        </button>
      </div>
      {showTerms && (
        <TermsAndConditions
          setShowTerms={setShowTerms}
          setTermsAccepted={setTermsAccepted}
        />
      )}
    </form>
  );
};

export default AddDetailsForm;
