
import { useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";


function Navbar() {
  const [isOpen, setOpen] = useState(false);
  var state = useSelector(selectUser)
  console.log('state is',state,state._id)
  const changeState = (isOpen) => {
    setOpen(!isOpen);
  };
  const items = [
    {
      name: "Home",
      link: "/",
    },
    {
      name:'Blogs',
      link :'/blogs'
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Register",
      link: "/signup",
    },
    {
      name: "Login",
      link: "/signin",
    },
    {
      name: "Logout",
      link: "/logout",
    },
  ];
  return (
    <section>
      <div className="shadow-md  top-0 left-0 w-full h-[10%] z-10 bg-white ">
      <div className="md:flex justify-between px-5 md:px-10">
        <Link to="/">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAeFBMVEX///8AAAD8/Pze3t45OTm2trbz8/OFhYXt7e2tra3Z2dnGxsbm5ua7u7uWlpaJiYmTk5NwcHDBwcGenp6np6d5eXkjIyNeXl7Ozs4rKyv29vZnZ2dFRUVUVFRQUFBsbGwSEhIvLy8+Pj4bGxsQEBBJSUl/f39SUlKchllnAAAEoklEQVR4nO3c2WKiMBQG4AEE2RcBwaWbrfb933CK2pbKloRstv93W2dOOIaQ5eC/fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKmabqFtwLPz4YxjoJVCTMtTPDMCrPVRCbmmOXxpdjXsuMvY2SzVfsTRrIjE1v6z0at3a2IyV2mO87sTNt8+UU3Uxd7FNfcOzV6XkgdrYSHJrF6mGgtVdLcfmKdspCs6iz8eZev2QBN8XW6958Xc+xnKFgmultppt7deL6JZvRRHduqaQ+agZY5XRDf0hCTpFXFWXkXPHcLyD/ar8tvPk3hZ8wBDaWvL4oBt4rS4sbM28Kihv/xoOiwb5gbfDZa87avfzTrMBHBXOveak6yyyGuKvF7LgvktOVz09V42DThd3GfOLuJabL5tPks4I8rLvkF/bI0qsZBG/82txItkRhfZYH74hKwr5EOLQAnCGZbrf/LiCs4FSZtFNQQk/j6arnj+q9PJG54jlY3SiH54vBQVjUg7BpV8g8FSSy6594iepVVycxuWJaYFApu+mqBQyRNyL+qfKFN7qR/FzrWpyfgP0q3gtsQQN7V/odM5zY1OOHcm48zmJeMbO33OQ4BZ1U8ctVKrHZjWYxwmlhQxWTA0fs46jPYsl5lUAgnc7EtJX0Ziuymb8lKX7CoI+Zp2am/FtQpVmrRTmTK408sk+5BC4FtcW6cSNzoqMPtoFLylJDQwz7NuaL6kYrU9LmyhmqSvkLdnS5ClW3V609Ta4s1a1VbUE+hfhz06uuDWm2atUt1QLZShH96uyN5DgzUN1KbUzfid2x/XXRkL/BJM9b/wWup7LVvgf3iVe3lkpmWHuJ+MMWiV6yfGW1xibHj+L2vv96PFdf86uHeOj4MbRPL/Kvi7sqrQc6jhstPw9ID2O5ci+fOdoTHdD1jsqukoenqdVymK/PHxw5yDDPGY2JCi/dQuaJD0+Hqa5wUZ8LDLPBvzc1BRRr7uAet1Er8uqGbbOlng/8MaM+bfTFlWyIUdGVK2/ToZTkLFvQkerLp/FMXyPtVEZfjWC9ZttRJXoTRQsx0/X5fTvNFMWdP93LTj1rKZbJteRtbPNrXZVpXti2XRRpkj3yXgfss2VcfPz3XpGnZTX2wDnyvOI5tuue1r2WedAznIZBfur7OK1dGvUMJqa1isu+Oc3wFEA68/byd/boAOhEs0a6Qz5emO3YTzf/gnpbXSSz3bITUUVKzXjS9k72GnHQfmlFq1y1xi2alyYi+mkazQt43md/H13iqXAptikpX1wI6SoKaZ9L1+p5/X5j4mOYODEU7bjk6WKZ3Fh7bnVqXBVkr5V0OGSDPWuxmS+gGlklglL34138AogcUxWkv6x3zGSNTVTRrW4Nv0u/VN00DQ29HYtbsE//9oWkV07vTt/5LoarId19V11+Q0ZHt3ci+tWYn1sRev2Wk37aZb9CX2H+DbbfudJod1NX349E1S25B59bwjr8Opj2nEuuKOur/6rLukfh74LdlSZXmp0x6CvG1J2ciRGLwlLLQwZNuZhjUcCGHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBf8h+3v0eGk86LjgAAAABJRU5ErkJggg=="
            className="lg:w-[120px] md:w-[120px] w-[100px] "
          ></img>
        </Link>

        <button
          className="md:hidden absolute top-5 right-5"
          onClick={() => changeState(isOpen)}
        >
          {isOpen ? (
            <i className="fa-solid fa-x text-2xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-2xl"></i>
          )}
        </button>

        <ul
          className={`flex md:flex-row  flex-col items-center transistion-all duration-500 ease-out ${
            isOpen ? "flex" : "md:flex hidden"
          }`}
        >
          {items.map((data, index) => {
            if (data.name === "Logout" && !state._id) {
              return null;
            } else if (
              (data.name === "Login" || data.name === "Register") &&
              state._id
            ) {
              return null;
            }
            return (
              <Link
                key={index}
                to={`${data.link}`}
                className="mx-3 md:my-0 my-2 font-semibold cursor-pointer"
                onClick={() => changeState(isOpen)}
              >
                {data.name}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
    </section>
  );
}

export default Navbar;
