import { UilAngleRight } from "@iconscout/react-unicons";

const NavData = (props) => {
  return (
    <div className="nav_data">
      <UilAngleRight />
      <h2 className="nav_subtitle">{props.subtitle}</h2>
    </div>
  );
};

export default NavData;
