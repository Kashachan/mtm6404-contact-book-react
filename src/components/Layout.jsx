import { Link, Outlet, NavLink, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const hideHeader = pathname !== "/"; 

  return (
    <div className="app-wrap">
      <div className="card">
        {!hideHeader && (
          <header className="app-header">
            <h1><Link to="/">Contacts</Link></h1>
            <nav className="app-nav">
              <NavLink to="/contacts/new">New Contact</NavLink>
            </nav>
          </header>
        )}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

