import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import { getContact, updateContact, deleteContact } from "../db";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContact(id);
      setContact(data);
    };
    fetchContact();
  }, [id]);

  const handleUpdate = async (updated) => {
    await updateContact(id, updated);
    navigate(`/contacts/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      navigate("/");
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="card">
      <Link to="/" className="detail-back">&lt; Contacts</Link>
      <h2>Edit Contact</h2>

    
      <div className="form">
        <ContactForm
          initial={contact}
          onSubmit={handleUpdate}
          submitLabel="Update Contact"
          onCancel={() => navigate(`/contacts/${id}`)}
        />

       
        <div className="delete-actions">
          <button
            className="btn btn--danger"
            onClick={handleDelete}
          >
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  );
}
