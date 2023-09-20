import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive
          ? "relative after:content-[''] after:absolute after:w-1 after:h-full after:bg-priceText after:top-0 after:left-1 after:rounded-full"
          : "") + " block w-full"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
