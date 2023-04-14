import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// assets
import arrow from "./assets/icon-arrow.svg";
import { useEffect } from "react";

let currentlyYear = new Date().getFullYear();
let currentlyMonth = new Date().getUTCMonth() + 1;
let currentlyDay = new Date().getUTCDate();

const schema = z
  .object({
    day: z
      .string()
      .max(2, { message: "Max. 2 characters." })
      .nonempty("This field is required.")
      .transform((val) => Number(val)),
    month: z
      .string()
      .max(2, { message: "Max. 2 characters." })
      .nonempty("This field is required.")
      .transform((val) => Number(val)),
    year: z
      .string()
      .length(4, { message: "Min. 4 characters." })
      .nonempty("This field is required.")
      .transform((val) => Number(val)),
  })
  .refine((fields) => fields.day > 0 && fields.day < 32, {
    path: ["day"],
    message: "Invalid day.",
  })
  .refine((fields) => fields.month > 0 && fields.month < 13, {
    path: ["month"],
    message: "Invalid month.",
  })
  .refine((fields) => fields.year <= currentlyYear, {
    path: ["year"],
    message: "Must be in the past.",
  });

function App() {
  let [datesDiff, setDatesDiff] = useState({});

  const formData = (data) => {
    let daysDiff = 0;
    let monthDiff = 0;
    let yearDiff = 0;

    if (currentlyDay >= data.day && currentlyMonth >= data.month) {
      daysDiff = currentlyDay - data.day;
      monthDiff = currentlyMonth - data.month;
      yearDiff = currentlyYear - data.year;
    }

    if (currentlyDay - data.day < 0) {
      currentlyDay += 30;
      --currentlyMonth;
    }

    if (currentlyMonth - data.month < 0) {
      currentlyMonth += 13;
      --currentlyYear;
    }

    daysDiff = currentlyDay - data.day;
    monthDiff = currentlyMonth - data.month;
    yearDiff = currentlyYear - data.year;

    setDatesDiff({ daysDiff, monthDiff, yearDiff });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="App">
      <div className="calc_container">
        <form action="" onSubmit={handleSubmit(formData)}>
          <div className="calc_container_inputs">
            <div className="calc_container_inputs_input">
              {errors.day ? (
                <label htmlFor="day" style={{ color: "#ff5757" }}>
                  Day
                </label>
              ) : (
                <label htmlFor="day">Day</label>
              )}

              {errors.day ? (
                <input
                  type="number"
                  placeholder="DD"
                  {...register("day")}
                  style={{ border: "1px solid #ff5757" }}
                />
              ) : (
                <input type="number" placeholder="DD" {...register("day")} />
              )}

              {errors.day && <span>{errors.day.message}</span>}
            </div>

            <div className="calc_container_inputs_input">
              {errors.month ? (
                <label htmlFor="month" style={{ color: "#ff5757" }}>
                  month
                </label>
              ) : (
                <label htmlFor="month">month</label>
              )}

              {errors.month ? (
                <input
                  type="number"
                  placeholder="MM"
                  {...register("month")}
                  style={{ border: "1px solid #ff5757" }}
                />
              ) : (
                <input type="number" placeholder="MM" {...register("month")} />
              )}

              {errors.month && <span>{errors.month.message}</span>}
            </div>

            <div className="calc_container_inputs_input">
              {errors.year ? (
                <label htmlFor="year" style={{ color: "#ff5757" }}>
                  year
                </label>
              ) : (
                <label htmlFor="year">year</label>
              )}

              {errors.year ? (
                <input
                  type="number"
                  placeholder="YYYY"
                  {...register("year")}
                  style={{ border: "1px solid #ff5757" }}
                />
              ) : (
                <input type="number" placeholder="YYYY" {...register("year")} />
              )}

              {errors.year && <span>{errors.year.message}</span>}
            </div>
          </div>

          <div className="calc_container_divider">
            <div className="calc_container_divider_line">
              <span></span>
              <div className="calc_container_divider_line_arrow">
                <button type="submit">
                  <img src={arrow} alt="" />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="calc_container_timer">
          <div className="calc_container_timer_stats">
            {datesDiff.yearDiff == 1 ? (
              <h2>
                <span>{datesDiff.yearDiff}</span> year
              </h2>
            ) : (
              <h2>
                <span>{datesDiff.yearDiff}</span> years
              </h2>
            )}
          </div>
          <div className="calc_container_timer_stats">
            {datesDiff.monthDiff == 1 ? (
              <h2>
                <span>{datesDiff.monthDiff}</span> month
              </h2>
            ) : (
              <h2>
                <span>{datesDiff.monthDiff}</span> months
              </h2>
            )}
          </div>
          <div className="calc_container_timer_stats">
            {datesDiff.daysDiff == 1 ? (
              <h2>
                <span>{datesDiff.daysDiff}</span> day
              </h2>
            ) : (
              <h2>
                <span>{datesDiff.daysDiff}</span> days
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
