import { UilSearch } from "@iconscout/react-unicons";
import NavContent from "./NavContent";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const navMenuData = [
    {
      title: "ДЛЯ МУЖЧИН",
      subtitle: ["Рубашки", "Свитшоты", "Джинсы"],
    },
    {
      title: "ДЛЯ ЖЕНЩИН",
      subtitle: ["Рубашки", "Свитшоты", "Джинсы"],
    },
    {
      title: "ДЛЯ ДЕТЕЙ",
      subtitle: ["Рубашки", "Свитшоты", "Джинсы"],
    },
  ];

  const navContents = navMenuData.map((data) => {
    return <NavContent title={data.title} subtitles={data.subtitle} />;
  });

  return (
    <div class="nav_menu" id="nav-menu">
      <div className="nav_search">
        <input type="text" placeholder="Поиск..." />
        <Link to="/search">
          <UilSearch />
        </Link>
      </div>

      <div className="nav_content">{navContents}</div>
    </div>
  );
};

export default NavMenu;
