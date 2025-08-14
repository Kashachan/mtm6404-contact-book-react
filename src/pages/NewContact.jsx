import { useNavigate, Link } from "react-router-dom";
import { db } from "../db";
import { addDoc, collection } from "firebase/firestore";
import ContactForm from "../components/ContactForm";

export default function NewContact() {
  const navigate = useNavigate();

  async function handleCreate(payload) {
    const ref = await addDoc(collection(db, "contacts"), payload);
    navigate(`/contacts/${ref.id}`);
  }

  return (
    <>
      <div className="topbar">
        <Link to="/" className="crumb">&lt; Contacts</Link>
      </div>

      <h2 className="page-title">New Contact</h2>

      <ContactForm
        onSubmit={handleCreate}
        submitLabel="Add Contact"
        onCancel={() => navigate("/")}
      />
    </>
  );
}
