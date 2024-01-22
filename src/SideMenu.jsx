// import { useEffect, useState } from "react";

// const getStorageTheme = () => {
//   let theme = "light-theme";
//   if (localStorage.getItem("theme")) {
//     theme = localStorage.getItem("theme");
//   }
//   return theme;
// };

const SideMenu = () => {
  //   const [theme, setTheme] = useState(getStorageTheme());

  //   const toogleTheme = () => {
  //     if (theme === "dark-theme") {
  //       setTheme("light-theme");
  //     } else {
  //       setTheme("dark-theme");
  //     }
  //   };

  //   useEffect(() => {
  //     document.documentElement.className = theme;
  //     localStorage.setItem("theme", theme);
  //   }, [theme]);

  return (
    <>
      <ul>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/62100"
          >
            <span className="font-bold">62100</span>Prikolice 1
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/62200"
          >
            <span className="font-bold">62200 </span>Astela & Alipna
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/63000"
          >
            <span className="font-bold">63000 </span>Avtodomi
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/63200"
          >
            <span className="font-bold">63200 </span>Sonic & Coral Supreme
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/65200"
          >
            <span className="font-bold">65200 </span>Van Bič
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/65300"
          >
            <span className="font-bold">65300 </span>Active Bič
          </a>
        </li>
        <li>
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/sum"
          >
            <span className="font-bold">SUMA </span>Vse linije
          </a>
        </li>
        <li className="hidden">
          <a
            className="hover:text-amNeutral100 hover:bg-amPrimary text-amText flex w-full gap-8 rounded-br-[2rem] px-8 py-6 text-[1.5rem] duration-300 ease-in hover:transition-all"
            href="/graphs"
          >
            <span className="font-bold">GRAFI </span>Graf
          </a>
        </li>
        {/* <li onClick={toogleTheme}>
          <div className="theme-btn">
            {theme === "light-theme" ? (
              // <img className="theme-icon" src={Moon} />
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="theme-icon"
              >
                <path
                  d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              // <img className="theme-icon" src={Sun} />
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="theme-icon"
              >
                <path
                  d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
        </li> */}
      </ul>
    </>
  );
};

export default SideMenu;
