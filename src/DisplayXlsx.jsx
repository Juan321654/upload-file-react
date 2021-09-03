import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

const DisplayXlsx = () => {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table container">
        <thead>
          <tr>
            {items.length > 0
              ? Object.keys(items[0]).map((e) => <th>{e}</th>)
              : null}
          </tr>
        </thead>
        <tbody>
          {items.map((d, idx) => {
            let headers = Object.keys(d);
            return (
              <tr>
                {headers.map((e) => (
                  <td>{d[e]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayXlsx;
