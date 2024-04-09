const SideMenu = () => {
  const menuItems = [
    { lineNumber: 62100, name: "Prikolice 1", link: "/62100" },
    { lineNumber: 62200, name: "Astela & Alpina", link: "/62200" },
    { lineNumber: 63000, name: "Avtodomi", link: "/63000" },
    { lineNumber: 63200, name: "Sonic & Coral Supreme", link: "/63200" },
    { lineNumber: 65200, name: "Van Bič", link: "/65200" },
    { lineNumber: 65300, name: "Active Bič", link: "/65300" },
    { lineNumber: "SUMA", name: "Vse linije", link: "/sum" },
    { lineNumber: "GRAFI", name: "", link: "/graphs" },
  ];

  return (
    <>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="menu-item text-amText duration-100 ease-in hover:bg-amPrimary hover:text-amNeutral100 hover:transition-all"
          >
            <a
              className="flex w-full gap-8 overflow-hidden px-8 py-6 text-[1.5rem]  "
              href={item.link}
            >
              <span className="font-bold">{item.lineNumber}</span>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideMenu;
