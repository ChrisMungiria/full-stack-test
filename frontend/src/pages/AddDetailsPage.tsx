import AddDetailsForm from "../components/AddDetailsForm";

const AddDetailsPage = () => {
  return (
    <main className="min-h-screen flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-xl font-bold">It seems if your first time here👋🏽</h1>
      <h2 className="text-base font-light text-slate-400">
        We would like to get to know you better
      </h2>
      <AddDetailsForm />
    </main>
  );
};

export default AddDetailsPage;
