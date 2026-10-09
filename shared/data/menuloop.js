import Link from "next/link";
import { Fragment } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { ThemeChanger } from "../redux/action";
function Menuloop({
  local_varaiable,
  MENUITEMS,
  toggleSidemenu,
  HoverToggleInnerMenuFn,
  level,
}) {
  const handleClick = (event) => {
    // Your logic here
    event.preventDefault(); // Prevents the default anchor behavior (navigation)
    // ... other logic you want to perform on click
  };
  return (
    <Fragment>
      <Link
        href="#!"
        scroll={false}
        className={`side-menu__item ${MENUITEMS?.selected ? "active" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          toggleSidemenu(event, MENUITEMS);
        }}
        onMouseEnter={(event) => HoverToggleInnerMenuFn(event, MENUITEMS)}
      >
        <span
          className={`${
            local_varaiable?.dataVerticalStyle == "doublemenu" ? "" : "d-none"
          }`}
        >
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{MENUITEMS.title}</Tooltip>}
          >
            <div className={MENUITEMS?.selected ? "active-icon" : ""}>
              {MENUITEMS.icon}
            </div>
          </OverlayTrigger>
        </span>
        {local_varaiable?.dataVerticalStyle != "doublemenu" ? (
          <span className={MENUITEMS?.selected ? "active-icon" : ""}>
            {MENUITEMS.icon}
          </span>
        ) : (
          ""
        )}

        <span
          className={`${level == 1 ? "side-menu__label" : ""} ${
            MENUITEMS?.selected ? "active-text" : ""
          }`}
        >
          {" "}
          {MENUITEMS.title}{" "}
          {MENUITEMS.badgetxt ? (
            <span className={MENUITEMS.class}> {MENUITEMS.badgetxt} </span>
          ) : (
            ""
          )}
        </span>
        <i className="fe fe-chevron-right side-menu__angle"></i>
      </Link>
      <ul
        className={`slide-menu child${level}  ${
          MENUITEMS.active ? "double-menu-active" : ""
        } ${MENUITEMS?.dirchange ? "force-left" : ""}  `}
        style={MENUITEMS.active ? { display: "block" } : { display: "none" }}
      >
        {level <= 1 ? (
          <li className="slide side-menu__label1">
            <Link href="#!">{MENUITEMS.title}</Link>
          </li>
        ) : (
          ""
        )}
        {MENUITEMS.children.map((firstlevel) => (
          <li
            className={`${firstlevel.menutitle ? "slide__category" : ""} ${
              firstlevel?.type == "empty" ? "slide" : ""
            } ${firstlevel?.type == "link" ? "slide" : ""} ${
              firstlevel?.type == "sub" ? "slide has-sub" : ""
            } ${firstlevel?.active ? "open" : ""} ${
              firstlevel?.selected ? "active" : ""
            }`}
            key={Math.random()}
          >
            {firstlevel.type === "link" ? (
              <Link
                href={firstlevel.path}
                className={`side-menu__item ${
                  firstlevel.selected ? "active" : ""
                }`}
              >
                <span className={firstlevel.selected ? "active-icon" : ""}>
                  {firstlevel.icon}
                </span>
                <span className={`${firstlevel.selected ? "active-text" : ""}`}>
                  {firstlevel.title}
                  {firstlevel.badgetxt ? (
                    <span className={firstlevel.class}>
                      {firstlevel.badgetxt}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </Link>
            ) : (
              ""
            )}
            {firstlevel.type === "empty" ? (
              <Link href="#!" className="side-menu__item" onClick={handleClick}>
                {firstlevel.icon}
                <span className="">
                  {firstlevel.title}
                  {firstlevel.badgetxt ? (
                    <span className={firstlevel.class}>
                      {firstlevel.badgetxt}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </Link>
            ) : (
              ""
            )}
            {firstlevel.type === "sub" ? (
              <Menuloop
                MENUITEMS={firstlevel}
                toggleSidemenu={toggleSidemenu}
                HoverToggleInnerMenuFn={HoverToggleInnerMenuFn}
                level={level + 1}
              />
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Menuloop);
