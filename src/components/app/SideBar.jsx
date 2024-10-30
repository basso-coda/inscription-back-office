import { useApp } from "@/hooks/useApp";
import "../../styles/app/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FormattedMessage } from "react-intl";
import Logo from "../../assets/logo_bitwi.jpeg";

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
        <h4 className="mx-2 mb-0">BITWI - CNCM</h4>
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

          {/* lapins */}
          <div className="nav-item ml-5">
            <a
              onClick={toggleSubMenu}
              className="text-decoration-none rounded d-block"
              data-bs-toggle="collapse"
              href="#lapins"
              role="button"
              aria-expanded="false"
              aria-controls="lapins"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon">
                    <svg id='Rabbit_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#FFFFFF' opacity='0' />
                      <g transform="matrix(0.77 0 0 0.77 12 12)" >
                        <path stroke='none' strokeWidth={1} strokeDasharray={'none'} strokeLinecap={'butt'} strokeDashoffset={0} strokeLinejoin={'miter'} strokeMiterlimit={4} fill='rgb(255,255,255)' fillRule='nonzero' opacity={1} transform=" translate(-12.99, -13.5)" d="M 10.40625 1 C 9.90625 1 9 1.199219 9 2 C 9 2.597656 9.234375 2.875 9.75 3.125 C 9.4375 3.058594 9.160156 3 8.90625 3 C 7.804688 3 7 3.710938 7 4.3125 C 7 6.519531 10.808594 5.429688 15.3125 7.65625 C 15.121094 8.109375 14.996094 8.570313 14.96875 9.03125 C 13.542969 11.785156 2.113281 5.671875 2 19 C 0.898438 19 0 19.898438 0 21 C 0 22.101563 0.898438 23 2 23 C 2.597656 23 3.425781 22.730469 4.0625 22.3125 C 4.308594 23.539063 4 24.046875 4 25 C 4 25.699219 5.101563 26.011719 6.5 25.8125 C 7.699219 25.8125 9.105469 25.5 10.40625 25.5 C 13.207031 25.5 18.90625 26.3125 18.90625 25.3125 C 18.90625 24.613281 18.1875 22.90625 10.6875 22.90625 C 11.988281 22.707031 14.09375 22.5 15.59375 20.5 C 17.394531 18.300781 14.605469 13.488281 10.40625 16.6875 C 10.40625 16.6875 11.804688 15 13.40625 15 C 15.507813 15 17.792969 17 16.59375 20 C 17.394531 21.101563 20.3125 26 21.3125 26 C 23.3125 26 24.8125 26.09375 24.8125 25.59375 C 24.8125 23.195313 22.3125 24.292969 21.8125 23.59375 C 21.613281 23.292969 21.6875 21.40625 21.1875 19.90625 C 20.105469 16.871094 21.222656 15.597656 21.28125 14 C 23.34375 13.980469 25.390625 13.425781 25.8125 12.40625 C 26.613281 10.507813 24.300781 6.695313 22 5.59375 C 20.796875 4.964844 19.359375 4.882813 18.09375 5.25 C 17.769531 4.792969 17.152344 4.019531 15.8125 3 C 14.011719 1.699219 11.804688 1 10.40625 1 Z M 22 8 C 22.601563 8 23 8.398438 23 9 C 23 9.601563 22.601563 10 22 10 C 21.398438 10 21 9.601563 21 9 C 21 8.398438 21.398438 8 22 8 Z" />
                      </g>
                    </svg>
                  </div>
                  <span className="menu-title">Lapins</span>
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

          <div className="sub-menus collapse ml-3" id="lapins">

            {!user.hasPermission('regimes') && <div className="nav-item">
              <NavLink
                to={"regimes"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/regimes"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Regimes</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('maladies') && <div className="nav-item">
              <NavLink
                to={"maladies"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/maladies"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Maladies</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('statut_traitements') && <div className="nav-item">
              <NavLink
                to={"statut_traitements"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/statut_traitements"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Statut traitements</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('statut_regimes') && <div className="nav-item">
              <NavLink
                to={"statut_regimes"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/statut_regimes"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Statut regimes</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('Vaccination') && <div className="nav-item">
              <NavLink
                to={"Vaccination"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/Vaccination"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Vaccination</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('nutriments') && <div className="nav-item">
              <NavLink
                to={"nutriments"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/nutriments"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Nutriments</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('categorie_lapins') && <div className="nav-item">
              <NavLink
                to={"categorie_lapins"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/categorie_lapins"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Categorie lapins</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>

          {!user.hasPermission('Categorie_depense') && <div className="nav-item">
            <NavLink
              to={"Categorie_depense"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Categorie_depense"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Catégorie dépense</span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>
        {/* Fin Sous-menu Administrations */}

        {/* Ressources humaines */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#ressource_humaine"
            role="button"
            aria-expanded="false"
            aria-controls="ressource_humaine"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <span className="menu-title">Ressources humaines</span>
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

        {/* Sous menu ressources humaines */}
        <div className="sub-menus collapse ml-3" id="ressource_humaine">

          {/* Employées */}
          <div className="nav-item">
            <a
              onClick={toggleSubMenu}
              className="text-decoration-none rounded d-block"
              data-bs-toggle="collapse"
              href="#employees"
              role="button"
              aria-expanded="false"
              aria-controls="employees"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>

                  </div>
                  <span className="menu-title">Gestion des employées</span>
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

          <div className="sub-menus collapse" id="employees">
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
                    <span className="menu-title capitalize">Employées</span>
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
                    <span className="menu-title">Historque des employées</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>

          {/* Pointage */}
          <div className="nav-item">
            <a
              onClick={toggleSubMenu}
              className="text-decoration-none rounded d-block"
              data-bs-toggle="collapse"
              href="#pointage"
              role="button"
              aria-expanded="false"
              aria-controls="pointage"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                    </svg>
                  </div>
                  <span className="menu-title">Pointage</span>
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

          {/* Sous-menu pointage */}
          <div className="sub-menus collapse" id="pointage">
            {!user.hasPermission('absences') && <div className="nav-item">
              <NavLink
                to={"absences"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/absences"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Absences</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('presence') && <div className="nav-item">
              <NavLink
                to={"presences"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/presences"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Presence</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('presence') && <div className="nav-item">
              <NavLink
                to={"generate-qrcode"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/generate-qrcode"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title capitalize">Générer QR code</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>

          {/* Carrière */}
          <div className="nav-item">
            <a
              onClick={toggleSubMenu}
              className="text-decoration-none rounded d-block"
              data-bs-toggle="collapse"
              href="#Carriere"
              role="button"
              aria-expanded="false"
              aria-controls="Carriere"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>

                  </div>
                  <span className="menu-title">Carrière</span>
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

          {/* sous menu carriere */}
          <div className="sub-menus collapse" id="Carriere">

            {!user.hasPermission('Carriere') && <div className="nav-item">
              <NavLink
                to={"Carriere"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/Carriere"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Carriere</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('Evaluation') && <div className="nav-item">
              <NavLink
                to={"evaluation"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/evaluation"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Evaluation</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('contribution') && <div className="nav-item">
              <NavLink
                to={"contribution"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/contribution"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Contribution</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('Cotation') && <div className="nav-item">
              <NavLink
                to={"Cotation"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/Cotation"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Cotation</span>
                  </div>
                </div>
              </NavLink>
            </div>}
            {!user.hasPermission('Contrat') && <div className="nav-item">
              <NavLink
                to={"Contrat"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/Contrat"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Contrat</span>
                  </div>
                </div>
              </NavLink>
            </div>}

            {!user.hasPermission('HistoriqueContrat') && <div className="nav-item">
              <NavLink
                to={"HistoriqueContrat"}
                className={({ isActive }) =>
                  isActive
                    ? "admin text-decoration-none rounded d-block"
                    : "text-decoration-none rounded d-block"
                }
                href="/HistoriqueContrat"
              >
                <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="menu-icon"></div>
                    <span className="menu-title">Historique Contrat</span>
                  </div>
                </div>
              </NavLink>
            </div>}
          </div>
          {/* fin sous menu */}
          {/* fin */}
        </div>
        {/* fin sous menu */}
        {/* fin */}

        {/* Menu Partenaires */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#partenaires"
            role="button"
            aria-expanded="false"
            aria-controls="partenaires"
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
                <span className="menu-title">Gestion des partenaires</span>
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
        <div className="sub-menus collapse" id="partenaires">
          {!user.hasPermission('partenaires') && <div className="nav-item">
            <NavLink
              to={"partenaires"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/partenaires"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Ppartenaires</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('type_partenaires') && <div className="nav-item">
            <NavLink
              to={"type_partenaires"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/type_partenaires"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Type partenaires</span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>
        {/* Fin Sous-menu partenaires */}

        {/* Stock */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#gestion_stock"
            role="button"
            aria-expanded="false"
            aria-controls="gestion_stock"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <span className="menu-title">Gestion de stock</span>
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

        <div className="sub-menus collapse" id="gestion_stock">
          {!user.hasPermission('categories') && <div className="nav-item">
            <NavLink
              to={"categories"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/categories"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Catégories</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('articles') && <div className="nav-item">
            <NavLink
              to={"articles"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/articles"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Articles</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('stock') && <div className="nav-item">
            <NavLink
              to={"stock"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/stock"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Stock</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('entrees') && <div className="nav-item">
            <NavLink
              to={"entrees"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/entrees"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Entrées</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('sorties') && <div className="nav-item">
            <NavLink
              to={"sorties"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/sorties"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">Sorties</span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>

        {/* Menu Gestion lapin */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#lapin"
            role="button"
            aria-expanded="false"
            aria-controls="lapin"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">

                  <svg id='Rabbit_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#FFFFFF' opacity='0' />
                    <g transform="matrix(0.77 0 0 0.77 12 12)" >
                      <path stroke='none' strokeWidth={1} strokeDasharray={'none'} strokeLinecap={'butt'} strokeDashoffset={0} strokeLinejoin={'miter'} strokeMiterlimit={4} fill='rgb(255,255,255)' fillRule='nonzero' opacity={1} transform=" translate(-12.99, -13.5)" d="M 10.40625 1 C 9.90625 1 9 1.199219 9 2 C 9 2.597656 9.234375 2.875 9.75 3.125 C 9.4375 3.058594 9.160156 3 8.90625 3 C 7.804688 3 7 3.710938 7 4.3125 C 7 6.519531 10.808594 5.429688 15.3125 7.65625 C 15.121094 8.109375 14.996094 8.570313 14.96875 9.03125 C 13.542969 11.785156 2.113281 5.671875 2 19 C 0.898438 19 0 19.898438 0 21 C 0 22.101563 0.898438 23 2 23 C 2.597656 23 3.425781 22.730469 4.0625 22.3125 C 4.308594 23.539063 4 24.046875 4 25 C 4 25.699219 5.101563 26.011719 6.5 25.8125 C 7.699219 25.8125 9.105469 25.5 10.40625 25.5 C 13.207031 25.5 18.90625 26.3125 18.90625 25.3125 C 18.90625 24.613281 18.1875 22.90625 10.6875 22.90625 C 11.988281 22.707031 14.09375 22.5 15.59375 20.5 C 17.394531 18.300781 14.605469 13.488281 10.40625 16.6875 C 10.40625 16.6875 11.804688 15 13.40625 15 C 15.507813 15 17.792969 17 16.59375 20 C 17.394531 21.101563 20.3125 26 21.3125 26 C 23.3125 26 24.8125 26.09375 24.8125 25.59375 C 24.8125 23.195313 22.3125 24.292969 21.8125 23.59375 C 21.613281 23.292969 21.6875 21.40625 21.1875 19.90625 C 20.105469 16.871094 21.222656 15.597656 21.28125 14 C 23.34375 13.980469 25.390625 13.425781 25.8125 12.40625 C 26.613281 10.507813 24.300781 6.695313 22 5.59375 C 20.796875 4.964844 19.359375 4.882813 18.09375 5.25 C 17.769531 4.792969 17.152344 4.019531 15.8125 3 C 14.011719 1.699219 11.804688 1 10.40625 1 Z M 22 8 C 22.601563 8 23 8.398438 23 9 C 23 9.601563 22.601563 10 22 10 C 21.398438 10 21 9.601563 21 9 C 21 8.398438 21.398438 8 22 8 Z" />
                    </g>
                  </svg>
                </div>
                <span className="menu-title">Gestion des lapins</span>
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

        {/* Sous-menu gestion Lapin */}
        <div className="sub-menus collapse" id="lapin">
          {!user.hasPermission('demande_lapin') && <div className="nav-item">
            <NavLink
              to={"demande-lapin"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/demande-lapin"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Demande de lapins</span>
                </div>
              </div>
            </NavLink>
          </div>}


          {!user.hasPermission('VaccinationLapin') && <div className="nav-item">
            <NavLink
              to={"VaccinationLapin"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/VaccinationLapin"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Lapin vaccination</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('accouplement') && <div className="nav-item">
            <NavLink
              to={"accouplement"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/accouplement"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Accouplement</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('lapins') && <div className="nav-item">
            <NavLink
              to={"lapins"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/lapins"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Lapins</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('plan_nutritionnels') && <div className="nav-item">
            <NavLink
              to={"plan_nutritionnels"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/plan_nutritionnels"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3 text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Plan nutritionnels</span>
                </div>
              </div>
            </NavLink>
          </div>}

        </div>

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

          {!user.hasPermission('Facture') && <div className="nav-item">
            <NavLink
              to={"Facture"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Facture"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Facture</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('Paiement') && <div className="nav-item">
            <NavLink
              to={"Paiement"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Paiement"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Paiement</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('Depense') && <div className="nav-item">
            <NavLink
              to={"Depense"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Depense"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title"> Dépense</span>
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

          {!user.hasPermission('rapportStatusLapin') && <div className="nav-item">
            <NavLink
              to={"rapportStatusLapin"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/rapportStatusLapin"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Statut Lapin </span>
                </div>
              </div>
            </NavLink>
          </div>}
          {!user.hasPermission('status_employe') && <div className="nav-item">
            <NavLink
              to={"status_employe"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/status_employe"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Status Employees</span>
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