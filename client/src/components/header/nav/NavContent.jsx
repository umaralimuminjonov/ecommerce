import { UilAngleDown, UilAngleRight } from "@iconscout/react-unicons";
import NavData from "./NavData";

const NavContent = (props) => {
  const navDatas = props.subtitles.map((data) => <NavData subtitle={data} />);
  return (
    <div className="nav_content">
      <div className="nav_header">
        <h1 className="nav_title">{props.title}</h1>
        <UilAngleDown className="nav_arrow" />
      </div>

      <div className="nav_list grid">{navDatas}</div>
    </div>
  );
};

export default NavContent;
