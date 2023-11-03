import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import "./App.css";
import hambur from "./images/ham-bur.svg";
import { AnimatePresence, motion } from "framer-motion";

import data from "./planetData";
import arrow from "./images/arrowUp.svg";

const DataContext = createContext();
function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "planet":
        return { ...state, content: "overview", planet: action.payload };
      case "content":
        return { ...state, content: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    planet: "earth",
    content: "overview",
  });

  const curColors = {
    earth: "text-earth",
    earthbg: "bg-earth",
    earthabg: "after:bg-earth",
    jupiter: "text-jupiter",
    jupiterbg: "bg-jupiter",
    jupiterabg: "after:bg-jupiter",
    mars: "text-mars",
    marsbg: "bg-mars",
    marsabg: "after:bg-mars",
    mercury: "text-mercury",
    mercurybg: "bg-mercury",
    mercuryabg: "after:bg-mercury",
    venus: "text-venus",
    venusbg: "bg-venus",
    venusabg: "after:bg-venus",
    uranus: "text-uranus",
    uranusbg: "bg-uranus",
    uranusabg: "after:bg-uranus",
    neptune: "text-neptune",
    neptunebg: "bg-neptune",
    neptuneabg: "after:bg-neptune",
    saturn: "text-saturn",
    saturnbg: "bg-saturn",
    saturnabg: "after:bg-saturn",
  };
  return (
    <div className="bg-mainBg w-screen h-full min-h-screen relative overflow-x-hidden">
      <motion.div
        initial={{ opacity: 1, x: "-100%" }}
        animate={{ opacity: 1, x: "100%" }}
        exit={{ opacity: 1, x: "-100%" }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="absolute h-full inset-0 bgMain w-[200vw] z-0"
      >
        {" "}
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: "-100%" }}
        animate={{ opacity: 1, x: "100%" }}
        exit={{ opacity: 1, x: "-100%" }}
        transition={{
          duration: 60,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: 28,
        }}
        className="absolute h-full inset-0 bgMain w-[200vw] z-0"
      >
        {" "}
      </motion.div>
      <DataContext.Provider
        value={{
          state,
          dispatch,
          curColors,
        }}
      >
        <div className="w-full h-full">
          <div className="z-40 relative">
            <Nav />
            <Tabs />
          </div>
          <div className="z-30 relative flex flex-col lap:flex-row lap:gap-4 lap:items-center lap:w-screen lap:justify-center">
            <Planet />
            <div className="lap:max-w-[510px] mx-[5vw] lap:w-[40%] flex tab:mx-[6vw] lap:mx-0 items-center lap:items-start justify-between gap-8 tab:mt-6 lap:mt-0 lap:flex-col">
              <Info />
              <Tbtabs />
            </div>
          </div>
          <div className="z-30 lap:max-w-[1304px] lap:mx-auto relative my-6 lap:mt-20 lap:mb-10 flex flex-col gap-4 mb-10 tab:flex-row tab:mx-[6vw] lap:w-screen lap:justify-center">
            <Stats title="rotation time" data={data[state.planet].rotation} />
            <Stats
              title="revolution time"
              data={data[state.planet].revolution}
            />
            <Stats title="radius" data={data[state.planet].radius} />
            <Stats title="average temp" data={data[state.planet].temperature} />
          </div>
        </div>
      </DataContext.Provider>
    </div>
  );
}

function Nav() {
  const [menuState, setMenu] = useState(false);
  useEffect(() => {
    if (menuState) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuState]);
  const menuVars = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.14,
        delayChildren: 0.1,
        staggerDirection: 1,
      },
    },
    exit: {
      scaleX: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        delayChildren: 0.01,
        staggerDirection: 1,
      },
    },
  };
  const linkVars = {
    initial: {
      x: "10vw",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      y: "2vh",
      opacity: 0,
    },
  };

  const { dispatch, state, curColors } = useContext(DataContext);

  return (
    <div className="">
      <div className="flex justify-between items-center min-h-[80px] tab:min-h-[60px] h-[10%] font-ant tab:h-auto  py-6 px-[5vw] nvbt tab:flex-col tab:justify-center tab:gap-8 lap:flex-row lap:justify-between">
        <h2 className="text-[30px]">THE PLANETS</h2>
        <img
          className="w-[30px] tab:hidden"
          src={hambur}
          alt="menu_opener"
          onClick={() => setMenu(!menuState)}
        />
        <ul className="hidden tab:flex uppercase justify-between items-center w-full text-[15px] font-sans font-extrabold max-w-[680px]">
          <li
            className={`${
              state.planet === "mercury"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "mercury" })}
          >
            mercury
          </li>
          <li
            className={`${
              state.planet === "venus"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "venus" })}
          >
            venus
          </li>
          <li
            className={`${
              state.planet === "earth"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "earth" })}
          >
            earth
          </li>
          <li
            className={`${
              state.planet === "mars"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "mars" })}
          >
            mars
          </li>
          <li
            className={`${
              state.planet === "jupiter"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "jupiter" })}
          >
            jupiter
          </li>
          <li
            className={`${
              state.planet === "saturn"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "saturn" })}
          >
            saturn
          </li>
          <li
            className={`${
              state.planet === "uranus"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "uranus" })}
          >
            uranus
          </li>
          <li
            className={`${
              state.planet === "neptune"
                ? curColors[state.planet]
                : "text-slate-500"
            }`}
            onClick={() => dispatch({ type: "planet", payload: "neptune" })}
          >
            neptune
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {menuState && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-right z-50 pt-10 pb-12 fixed w-full h-[90%]  justify-evenly bg-mainBg mob_ul flex flex-col gap-4 tab:hidden font-sans text-[1.15rem] text-slate-200 font-bold"
          >
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="mercury"
              onClick={() => {
                dispatch({ type: "planet", payload: "mercury" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-mercury rounded-full "></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "mercury" ? curColors[state.planet] : ""
                }`}
              >
                MERCURY
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="venus"
              onClick={() => {
                dispatch({ type: "planet", payload: "venus" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-venus rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "venus" ? curColors[state.planet] : ""
                }`}
              >
                VENUS
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="earth"
              onClick={() => {
                dispatch({ type: "planet", payload: "earth" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-earth rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "earth" ? curColors[state.planet] : ""
                }`}
              >
                EARTH
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="mars"
              onClick={() => {
                dispatch({ type: "planet", payload: "mars" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-mars rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "mars" ? curColors[state.planet] : ""
                }`}
              >
                MARS
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="jupiter"
              onClick={() => {
                dispatch({ type: "planet", payload: "jupiter" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-jupiter rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "jupiter" ? curColors[state.planet] : ""
                }`}
              >
                JUPITER
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="saturn"
              onClick={() => {
                dispatch({ type: "planet", payload: "saturn" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-saturn rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "saturn" ? curColors[state.planet] : ""
                }`}
              >
                SATURN
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="uranus"
              onClick={() => {
                dispatch({ type: "planet", payload: "uranus" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-uranus rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "uranus" ? curColors[state.planet] : ""
                }`}
              >
                URANUS
              </p>
            </motion.li>
            <motion.li
              variants={linkVars}
              className="flex gap-10 items-center mx-6 pb-4"
              value="neptune"
              onClick={() => {
                dispatch({ type: "planet", payload: "neptune" });
                setMenu(!menuState);
              }}
            >
              <div className="w-[22px] h-[22px] bg-neptune rounded-full"></div>
              <p
                className={`p-0 m-0 tracking-[0.2em] mt-[4.5px] ${
                  state.planet === "neptune" ? curColors[state.planet] : ""
                }`}
              >
                NEPTUNE
              </p>
            </motion.li>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tabs() {
  const { dispatch, state, curColors } = useContext(DataContext);
  const colorbg = `${state.planet}abg`;
  const clss = `bg-dgray after:content-[''] after:absolute after:w-full text-slate-100 after:bottom-0 after:h-[4px] ${curColors[colorbg]} after:left-0`;
  return (
    <div className="font-sans flex gap-[2vw] items-center justify-center tbbt font-bold tracking-[0.55em] text-slate-400 text-[11px] tab:hidden ">
      <button
        className={`relative txy w-[28%] py-4 px-4 tracking-[0.1em] ${
          state.content === "overview" ? clss : ""
        }`}
        onClick={() => dispatch({ type: "content", payload: "overview" })}
      >
        OVERVIEW
      </button>
      <button
        className={`relative txy w-[28%] py-4 px-4 tracking-[0.1em] ${
          state.content === "structure" ? clss : ""
        }`}
        onClick={() => dispatch({ type: "content", payload: "structure" })}
      >
        STRUCTURE
      </button>
      <button
        className={`relative txy w-[28%] py-4 px-4 tracking-[0.1em] ${
          state.content === "geology" ? clss : ""
        }`}
        onClick={() => dispatch({ type: "content", payload: "geology" })}
      >
        SURFACE
      </button>
    </div>
  );
}

function Planet() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { state } = useContext(DataContext);
  const pl = state.planet;
  const widthObj = {
    earthm: "w-earthm",
    eartht: "w-eartht",
    earthd: "w-earthd",
    jupiterm: "w-jupiterm",
    jupitert: "w-jupitert",
    jupiterd: "w-jupiterd",
    marsm: "w-marsm",
    marst: "w-marst",
    marsd: "w-marsd",
    mercurym: "w-mercurym",
    mercuryt: "w-mercuryt",
    mercuryd: "w-mercuryd",
    saturnm: "w-saturnm",
    saturnt: "w-saturnt",
    saturnd: "w-saturnd",
    uranusm: "w-uranusm",
    uranust: "w-uranust",
    uranusd: "w-uranusd",
    neptunem: "w-neptunem",
    neptunet: "w-neptunet",
    neptuned: "w-neptuned",
    venusm: "w-venusm",
    venust: "w-venust",
    venusd: "w-venusd",
  };

  const desk = `${pl}d`;
  const tab = `${pl}t`;
  const mob = `${pl}m`;
  console.log(windowWidth);

  return (
    <div className="w-full lap:h-[658px] lap:w-[56%] lap:max-w-[800px] lap:min-w-[600px] flex items-center justify-center mb-6 tab:mb-0 mt-8 lap:mt-2 tab:mt-28 h-[230px] tab:h-[375px]">
      {state.content === "overview" ? (
        <img
          className={`${
            windowWidth >= 1100
              ? widthObj[desk]
              : windowWidth >= 701
              ? widthObj[tab]
              : widthObj[mob]
          }`}
          src={`../public/imgr/planet-${pl}.svg`}
          alt="earth"
        />
      ) : state.content === "structure" ? (
        <img
          className={`${
            windowWidth >= 1100
              ? widthObj[desk]
              : windowWidth >= 701
              ? widthObj[tab]
              : widthObj[mob]
          }`}
          src={`../public/imgr/planet-${pl}-internal.svg`}
          alt="planet internal"
        />
      ) : (
        <div
          className={`relative ${
            windowWidth >= 1100
              ? widthObj[desk]
              : windowWidth >= 701
              ? widthObj[tab]
              : widthObj[mob]
          }`}
        >
          <img
            className="w-full"
            src={`../public/imgr/planet-${pl}.svg`}
            alt="planets"
          />
          <img
            className="absolute bottom-1/2 mx-auto w-[100px] tab:w-[100px] translate-y-[110%]   lap:w-[150px] left-1/2 transform -translate-x-1/2 tab:translate-y-[50%]"
            src={`../public/imgr/planet-${pl}-geology.png`}
            alt="geology"
          />
        </div>
      )}
    </div>
  );
}

function Info() {
  const { state } = useContext(DataContext);
  return (
    <div className="tab:max-w-[50%] lap:max-w-[35vw] lap:min-w-[450px] ">
      <h1 className="py-4 text-[40px] font-ant text-center tab:text-left tab:text-[50px] lap:font-bold lap:text-[70px] uppercase tab:mb-7 lap:mb-4">
        {state.planet}
      </h1>
      <p className="px-1 tab:px-0 text-center text-slate-400 text-[14px] lap:h-[140px] lap:text-[18px] font-semibold tab:text-left tab:mb-14 lap:mb-8">
        {data[state.planet][state.content].content}
      </p>
      <p className="flex gap-1 text-[18px] lap:text-[22px] text-slate-500 font-sans  mt-8 justify-center tab:justify-start tab:mb-4 lap:mb-0">
        Source:
        <a
          href={data[state.planet][state.content].source}
          className="flex items-center font-semibold underline text-slate-400"
        >
          Wikipedia <img className="pl-2 h-[16px]" src={arrow} alt="arrow" />
        </a>
      </p>
    </div>
  );
}
// eslint-disable-next-line
function Stats({ title, data }) {
  return (
    <div className="flex items-center justify-between border border-slate-600 border-solid w-[90vw] uppercase mx-auto px-6 py-2 tab:flex-col tab:w-[20vw] lap:max-w-[249.5px] tab:justify-items-start tab:items-start tab:py-6 lap:py-4 ">
      <p className="text-slate-500 font-sans text-[12px] lap:text-[1rem] font-bold">
        {title}
      </p>
      <h3 className="font-ant text-[18px] tab:text-[22px] lap:text-[2.5rem]">
        {data}
      </h3>
    </div>
  );
}

function Tbtabs() {
  const { dispatch, state, curColors } = useContext(DataContext);
  const cl = state.content;
  const send = `${state.planet}bg`;
  const color = `${curColors[send]}`;

  return (
    <div className="tab:flex flex-col gap-5 items-center lap:items-start lap:justify-start lap:w-full hidden ">
      <div
        value="overview"
        className={`lex max-w-[320px] ${
          cl === "overview" ? color : ""
        } w-[35vw] lap:w-[35vw] lap:max-w-[510px] text-[11px] lap:text-[16px] text-slate-400 justify-start uppercase items-center tracking-[0.15em] font-bold font-sans px-6 py-3 lap:py-4 border border-slate-600`}
        onClick={() => dispatch({ type: "content", payload: "overview" })}
      >
        01 <span className=" pl-6 text-slate-50">overview</span>
      </div>
      <div
        className={`flex w-[35vw] max-w-[320px] lap:w-[35vw] ${
          cl === "structure" ? color : ""
        } lap:max-w-[510px] text-[11px] lap:text-[16px] lap:py-4 text-slate-400 justify-start uppercase items-center tracking-[0.15em] font-bold font-sans px-6 py-3 border border-slate-600`}
        onClick={() => dispatch({ type: "content", payload: "structure" })}
      >
        02 <span className="pl-6 text-slate-50">internal structure</span>
      </div>
      <div
        className={`flex w-[35vw] lap:w-[35vw] lap:max-w-[510px] ${
          cl === "geology" ? color : ""
        } max-w-[320px] text-[11px] lap:text-[16px] lap:py-4 text-slate-400 justify-start uppercase items-center tracking-[0.15em] font-bold font-sans px-6 py-3 border border-slate-600`}
        onClick={() => dispatch({ type: "content", payload: "geology" })}
      >
        03 <span className="pl-6 text-slate-50">surface geology</span>
      </div>
    </div>
  );
}
// eslint-disable-next-line
export default App;