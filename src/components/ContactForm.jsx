import { useEffect, useState } from "react";

export default function ContactForm({
  initial = null,
  onSubmit,
  submitLabel = "Save",
  onCancel,
  cancelLabel = "Cancel",
  actionsAlign = "start",
}) {
  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName,  setLastName]  = useState(initial?.lastName  ?? "");
  const [email,     setEmail]     = useState(initial?.email     ?? "");
  const [phone,     setPhone]     = useState(initial?.phone     ?? "");


  useEffect(() => {
    if (!initial) return;
    setFirstName(initial.firstName ?? "");
    setLastName(initial.lastName ?? "");
    setEmail(initial.email ?? "");
    setPhone(initial.phone ?? "");
  }, [initial?.id]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.trim(),
      phone:     phone.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__row">
        <div>
          <label>First name*</label>
          <input value={firstName} onChange={e=>setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last name*</label>
          <input value={lastName} onChange={e=>setLastName(e.target.value)} required />
        </div>
      </div>

      <div className="form__row">
        <div>
          <label>Email*</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
      </div>

      <div className={`form-actions ${actionsAlign === "center" ? "center" : ""}`}>
        <button className="btn btn--primary" type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="btn btn--soft" onClick={onCancel}>{cancelLabel}</button>
        )}
      </div>
    </form>
  );
}
