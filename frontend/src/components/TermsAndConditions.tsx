const TermsAndConditions = ({
  setShowTerms,
  setTermsAccepted,
}: {
  setShowTerms: any;
  setTermsAccepted: any;
}) => {
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };
  return (
    <div className="w-screen h-screen absolute bg-slate-900/50 backdrop-blur-lg top-0 left-0 flex items-center justify-center">
      <div className="w-11/12 max-w-xs p-4 bg-white rounded-md shadow-xl max-h-56 overflow-scroll">
        <h1 className="text-lg font-bold text-center">
          Accept the terms and conditions
        </h1>
        <p>
          This is some text about the terms and conditions. Same an quit most
          an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise
          plate. Longer ladies valley get esteem use led six. Middletons
          resolution advantages expression themselves partiality so me at. West
          none hope if sing oh sent tell is. Full he none no side. Uncommonly
          surrounded considered for him are its. It we is read good soon. My to
          considered delightful invitation announcing of no decisively
          boisterous. Did add dashwoods deficient man concluded additions
          resources. Or landlord packages overcame distance smallest in
          recurred. Wrong maids or be asked no on enjoy. Household few sometimes
          out attending described. Lain just fact four of am meet high. Is
          education residence conveying so so. Suppose shyness say ten behaved
          morning had. Any unsatiable assistance compliment occasional too
          reasonably advantages. Unpleasing has ask acceptance partiality
          alteration understood two. Worth no tiled my at house added. Married
          he hearing am it totally removal. Remove but suffer wanted his lively
          length. Moonlight two applauded conveying end direction old principle
          but. Are expenses distance weddings perceive strongly who age
          domestic.
        </p>
        <button
          onClick={handleAcceptTerms}
          className="w-full p-3 text-white bg-blue-500 rounded-md shadow-xl"
        >
          Accept the terms
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
