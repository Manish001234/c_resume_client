import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Selecttheme.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getthemedata } from "../Redux/Reducers/themeReducer";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";

function Selecttheme() {
  const [loading, setLoading] = useState(true);
  const themeredux = useSelector((state) => state.theme);
  const userredux = useSelector((state) => state.user.userdata);
  const prefill = themeredux.theme
    ? themeredux.theme
    : { themename: "", color: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickindex, Setclickindex] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      theme: prefill.themename,
      color: prefill.color,
    },
  });
  const [cardselect, Setcardselect] = useState("");
  const [themedata, Setthemedata] = useState([]);
  const [selected, Setselected] = useState(
    prefill.themename ? prefill : { themename: "", color: "" }
  );

  const onSubmit = () => {
    dispatch(getthemedata(selected));
    navigate(`/theme-${selected.themename.toLocaleLowerCase()}/download`);
  };

  const radioinputFunc = (e) => {
    if (e.target.checked) {
      Setcardselect("card-selected");
    }
  };

  const loadFunc = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    async function getthemes() {
      try {
        const res = await axios.get("https://resumecraft-35ij.onrender.com/api/themes", {
          query: `query fetchtheme {
                    themes {
                      themename
                      img
                      colors
                      id
                    }
                  }`,
        });
        // console.log("ssss", res);
        if (!userredux.personal) {
          navigate("/");
        }
        Setthemedata(res.data);
        Setclickindex(
          prefill.themename
            ? res.data.findIndex((e) => e.themename === prefill.themename)
            : ""
        );
        Setcardselect("card-selected");
        loadFunc();
      } catch (error) {
        console.log(error);
      }
    }
    getthemes();
    // eslint-disable-next-line
  }, []);

  const resetColor = (item) => {
    setValue("color", "");
  };

  return (
    <>
      {loading ? (
        <BounceLoader className="loader" color="black" size={150} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="theme-header">Select Theme</div>
          <div className="theme-main">
            {themedata.map((item, index) => {
              return (
                <div
                  className={index === clickindex ? cardselect : ""}
                  onClick={() => {
                    Setclickindex(index);
                    Setselected((e) => ({ ...e, themename: item.themename }));
                    Setcardselect("card-selected");
                    resetColor(item);
                  }}
                  key={index}
                >
                  <img src={item.img} alt=""></img>
                  <div>{item.themename}</div>
                  <input
                    type={"radio"}
                    {...register("theme", { required: true })}
                    value={item.themename}
                    checked={index === clickindex ? true : false}
                    onClick={() => Setclickindex(index)}
                    onChange={radioinputFunc}
                    name="theme"
                  />
                </div>
              );
            })}
            <div className="theme-main-msg">More theme will available soon</div>
          </div>
          {errors.theme ? (
            <div className="theme-err">Select the theme</div>
          ) : null}

          {clickindex !== "" && themedata[clickindex] ? (
            <>
              <div className="theme-header">Select Theme Color</div>
              <div className="clr-select">
                {themedata[clickindex].colors.split(",").map((color, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      {...register("color", { required: true })}
                      value={color}
                      name="color"
                      onChange={(e) =>
                        Setselected((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                    />
                    <div style={{ backgroundColor: `${color}` }}></div>
                  </div>
                ))}
              </div>
              {errors.color && (
                <div className="theme-err">Select the theme color</div>
              )}
            </>
          ) : null}

          <div className="btn-div">
            <Link to={"/"} className="link">
              <button className="btn">Back</button>
            </Link>
            <button type="submit" className="btn">
              Proceed
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Selecttheme;
