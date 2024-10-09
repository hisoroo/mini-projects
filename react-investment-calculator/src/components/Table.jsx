/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./Table.css";

export default function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: data.Duration }, (_, i) => {
          const investmentValue = (
            parseFloat(data["Initial investment"]) +
            parseFloat(data["Annual investment"]) * i
          ).toFixed(2);
          const interest = (
            (investmentValue * parseFloat(data["Expected return"])) /
            100
          ).toFixed(2);
          const totalInterest = (interest * (i + 1)).toFixed(2);
          const investedCapital = (
            parseFloat(data["Initial investment"]) +
            parseFloat(data["Annual investment"]) * (i + 1)
          ).toFixed(2);
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{investmentValue}</td>
              <td>{interest}</td>
              <td>{totalInterest}</td>
              <td>{investedCapital}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
