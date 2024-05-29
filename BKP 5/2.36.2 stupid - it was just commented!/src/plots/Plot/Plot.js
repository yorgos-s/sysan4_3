import React from 'react'
import { useEffect } from 'react';

const Plot = ({ toggles2, vsb, Rows, dbRow, color, dash, id, active }) => {
    //  console.log(color[0]) 
    let subDivision = 5000 / (dbRow.length + 1);
    let tension = 1;
    let flx = 0.5;

    let indx = 0;
    let points = [];

    dbRow.forEach(d => {
        points.push(indx * subDivision)
        points.push(1000 - (d.value * 100))
        indx++
    })

    useEffect(() => {
        let pathL = document.querySelector(".path" + `${id}`);
        pathL.setAttribute("d", solve(points, tension, flx));
        //   console.log(pathL) 
    })
    // console.log(solve(points, tension, flx))

    function solve(data, k) {

        if (k == null) k = 1;

        var size = data.length;
        var last = size - 4;

        var pathM = "M" + [data[0] * flx, data[1] * flx];

        for (var i = 0; i < size - 2; i += 2) {

            var x0 = i ? data[i - 2] : data[0];
            var y0 = i ? data[i - 1] : data[1];

            var x1 = data[i + 0];
            var y1 = data[i + 1];

            var x2 = data[i + 2];
            var y2 = data[i + 3];

            var x3 = i !== last ? data[i + 4] : x2;
            var y3 = i !== last ? data[i + 5] : y2;

            var cp1x = x1 + (x2 - x0) / 6 * k;
            var cp1y = y1 + (y2 - y0) / 6 * k;

            var cp2x = x2 - (x3 - x1) / 6 * k;
            var cp2y = y2 - (y3 - y1) / 6 * k;

            pathM += "C" + [cp1x * flx, cp1y * flx, cp2x * flx,
            cp2y * flx, x2 * flx, y2 * flx];
        }
        return pathM;
    }



    return (
        <path className={"path" + `${id}`}
            stroke={`rgb(${color[0]},${color[1]},${color[2]})`}
            // stroke={`red`}
            strokeWidth='6'
            strokeDasharray={id < 4 ? "" : "10 10"}
            visibility={toggles2[id] ? 'default' : 'hidden'}
        />
    )
}

export default Plot