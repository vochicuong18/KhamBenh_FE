import React from "react";
import MonthBook from "./MonthBook";
import MonthSales from "./MonthSales";
import MonthFaculty from "./MonthFaculty";

import Total from "./Total";
export default function Chart() {
    return (
        <div className="container__chart">
            <div className="card__chart">
                <div className="item__chart">
                    <Total/>
                </div>
                <div className="item__chart">
                    <MonthSales />
                </div>
                <div className="item__chart">
                    <MonthBook />
                </div>
                <div className="item__chart">
                    <MonthFaculty />
                </div>
            </div>
        </div>
    );
}
