import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../db";
import { doc, getDoc } from "firebase/firestore"; 

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    (async () => {
      const ref = doc(db, "contacts", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setContact({ id: snap.id, ...snap.data() });
      else navigate("/", { replace: true });
    })();
  }, [id, navigate]);

  if (!contact) return <p>Loading…</p>;

  return (
    <article>
  
      <div className="detail-bar">
        <Link to="/" className="detail-back">&lt; Contacts</Link>
        <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
      </div>

      <h2 className="detail-name">{contact.firstName} {contact.lastName}</h2>

      <div className="detail-sections">
        <div className="detail-section">
          <div className="detail-label">email</div>
          {contact.email ? (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          ) : (
            <span>—</span>
          )}
        </div>

        {contact.phone && (
          <div className="detail-section">
            <div className="detail-label">Phone</div>
            <div>{contact.phone}</div>
          </div>
        )}

        {(contact.street || contact.city || contact.province || contact.postal) && (
          <div className="detail-section">
            <div className="detail-label">Address</div>
            <div>
              {contact.street && <div>{contact.street}</div>}
              <div>
                {[contact.city, contact.province, contact.postal]
                  .filter(Boolean)
                  .join(" ")}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

