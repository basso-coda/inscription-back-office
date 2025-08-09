import { useApp } from "@/hooks/useApp";
import "../../styles/app/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FormattedMessage } from "react-intl";
import Logo from "../../assets/biu-logo.jpg";

export default function SideBar() {
  const { setToastAction } = useApp();
  const { handleLogout, user } = useAuth();

  const toggleSubMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("collapse-show");
  };

  const onLogout = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleLogout();

    setToastAction({
      severity: "success",
      summary: "Success",
      detail: "Utilisateur déconnecté avec succés",
      life: 3000,
    })
  }

  return (
    <aside className="sidebar d-flex flex-column justify-content-between shadow z-1">
      <Link
        to={"/dashboard"}
        className="d-flex align-items-center px-3 py-2 text-decoration-none link-dark"
      >
        <img
          src={Logo}
          alt=""
          className="logo w-3 h-3"

        />
        {/* <img src={'/vite.svg?url'} alt="" className="logo" /> */}
        <h6 className="mx-2 mb-0">ONLINE - INSCRIPTION</h6>
      </Link>

      <nav className={`px-2 flex-fill pt-3`} id="side_color">
        {/* Menu Administration */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#administration"
            role="button"
            aria-expanded="false"
            aria-controls="administration"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <span className="menu-title text-white">Administration du système</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Administration */}

        {/* Sous-menu Administration */}
        <div className="sub-menus collapse" id="administration">

          {!user.hasPermission('profils') && <div className="nav-item">
            <NavLink
              to={"profils"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/profils"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Profils</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('roles') && <div className="nav-item">
            <NavLink
              to={"roles"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/roles"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Roles</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('motifs') && <div className="nav-item">
            <NavLink
              to={"motifs"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/motifs"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Motif</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('type_documents') && <div className="nav-item">
            <NavLink
              to={"type_documents"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/type_documents"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Type Document</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('type_paiements') && <div className="nav-item">
            <NavLink
              to={"type_paiements"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/type_paiements"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Type Paiement</span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>
        {/* Fin Sous-menu Administrations */}

        {/* Utilisateurs */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#utilisateur"
            role="button"
            aria-expanded="false"
            aria-controls="utilisateur"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <span className="menu-title">Gestion des utilisateurs</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Sous menu utilisateurs */}
          <div className="sub-menus collapse" id="utilisateur">
            {!user.hasPermission('utilisateurs') && <div className="nav-item">
              <NavLink
                to={"utilisateurs"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block text-white"
                    : "text-decoration-none rounded d-block text-white"
                }
                href="/utilisateurs"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Utilisateurs</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('historique_utilisateurs') && <div className="nav-item">
              <NavLink
                to={"historique-utilisateurs"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block text-white"
                    : "text-decoration-none rounded d-block text-white"
                }
                href="/historique-utilisateurs"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Historique des utilisateurs</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>
        {/* fin sous menu */}
        {/* fin */}

        {/* Menu Facultes */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#facultes"
            role="button"
            aria-expanded="false"
            aria-controls="facultes"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg id='Client_Management_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#FFFFFF' opacity='0' />
                    <g transform="matrix(1.11 0 0 1.11 12 12)" >
                      <path stroke='none' strokeWidth={1} strokeDasharray='none' strokeLinecap='butt' strokeDashoffset={0} strokeLinejoin='miter' strokeMiterlimit={4} fill='rgb(255,255,255)' fillRule='nonzero' opacity={1} transform=" translate(-12, -12)" d="M 3 3 L 3 7 L 5 7 L 5 5 L 7 5 L 7 3 L 3 3 z M 17 3 L 17 5 L 19 5 L 19 7 L 21 7 L 21 3 L 17 3 z M 12 5 C 10.346 5 9 6.346 9 8 C 9 9.654 10.346 11 12 11 C 13.654 11 15 9.654 15 8 C 15 6.346 13.654 5 12 5 z M 12 12 C 10.331 12 7 12.837 7 14.5 L 7 17 L 17 17 L 17 14.5 C 17 12.837 13.669 12 12 12 z M 3 17 L 3 21 L 7 21 L 7 19 L 5 19 L 5 17 L 3 17 z M 19 17 L 19 19 L 17 19 L 17 21 L 21 21 L 21 17 L 19 17 z" />
                    </g>
                  </svg>

                </div>
                <span className="menu-title">Gestion des facultés</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Partenaires */}

        {/* Sous-menu Partenaires */}
        <div className="sub-menus collapse" id="facultes">
          {!user.hasPermission('facultes') && <div className="nav-item">
            <NavLink
              to={"facultes"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/facultes"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title"><FormattedMessage id="facultes" /></span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('departements') && <div className="nav-item">
            <NavLink
              to={"departements"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/departements"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title"><FormattedMessage id="departements" /></span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('classes') && <div className="nav-item">
            <NavLink
              to={"classes"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/classes"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title"><FormattedMessage id="classes" /></span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>
        {/* Fin Sous-menu facultes */}

        {/* candidatures */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#candidature"
            role="button"
            aria-expanded="false"
            aria-controls="candidature"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <span className="menu-title">Gestion des candidatures</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Sous menu candidatures */}
          <div className="sub-menus collapse" id="candidature">
            {!user.hasPermission('candidatures') && <div className="nav-item">
              <NavLink
                to={"candidatures"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block text-white"
                    : "text-decoration-none rounded d-block text-white"
                }
                href="/candidatures"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Candidatures</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>
        {/* fin sous menu */}
        {/* fin */}

        {/* etudiants */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#etudiant"
            role="button"
            aria-expanded="false"
            aria-controls="etudiant"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <span className="menu-title">Gestion des etudiants</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Sous menu candidatures */}
          <div className="sub-menus collapse" id="etudiant">
            {!user.hasPermission('etudiants') && <div className="nav-item">
              <NavLink
                to={"etudiants"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block text-white"
                    : "text-decoration-none rounded d-block text-white"
                }
                href="/etudiants"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Etudiants</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>
          <div className="sub-menus collapse" id="etudiant">
            {!user.hasPermission('scanner-carte-etudiant') && <div className="nav-item">
              <NavLink
                to={"scanner-carte-etudiant"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block text-white"
                    : "text-decoration-none rounded d-block text-white"
                }
                href="/scanner-carte-etudiant"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Scanner Carte d'Etudiant</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>
        {/* fin sous menu */}
        {/* fin */}

        {/* Finance */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#finance"
            role="button"
            aria-expanded="false"
            aria-controls="finance"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 11.625h4.5m-4.5 2.25h4.5m2.121 1.527c-1.171 1.464-3.07 1.464-4.242 0-1.172-1.465-1.172-3.84 0-5.304 1.171-1.464 3.07-1.464 4.242 0M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>

                </div>
                <span className="menu-title">Finance</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* sous menu Finance */}
        <div className="sub-menus collapse" id="finance">

          {!user.hasPermission('paiements') && <div className="nav-item">
            <NavLink
              to={"paiements"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/paiements"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Paiement</span>
                </div>
              </div>
            </NavLink>
          </div>}

        </div>
        {/* fin sous menu */}
        {/* fin */}

        {/* Dashboard */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#Dashboard"
            role="button"
            aria-expanded="false"
            aria-controls="Dashboard"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>

                </div>
                <span className="menu-title">Dashboard</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* sous menu Dashboard */}
        <div className="sub-menus collapse" id="Dashboard">

          {!user.hasPermission('Dashboard') && <div className="nav-item">
            <NavLink
              to={"Dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Dashboard"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Dashboard</span>
                </div>
              </div>
            </NavLink>
          </div>}
          
        </div>
        {/* fin sous menu */}
        {/* fin */}
      </nav>

      <div className="aside-footer px-2 py-3" id="side_color">
        <hr />

        <div className="nav-item">
          <a
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#rapport"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={onLogout}
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                    />
                  </svg>
                </div>
                <span className="menu-title">Déconnexion</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
}