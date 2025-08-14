import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const contactsCol = collection(db, "contacts");
    const qy = query(contactsCol, orderBy("lastName"));
    const unsub = onSnapshot(qy, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setContacts(rows);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return contacts;
    return contacts.filter((c) =>
      `${c.firstName ?? ""} ${c.lastName ?? ""}`.toLowerCase().includes(needle)
    );
  }, [q, contacts]);

  return (
    <section>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Search by first or last name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: "100%", padding: "0.75rem" }}
        />
      </div>

      {filtered.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((c) => (
            <li key={c.id} style={{ padding: "0.75rem 0", borderBottom: "1px solid #ddd" }}>
              <Link to={`/contacts/${c.id}`}>
                <strong>{c.firstName} {c.lastName}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
