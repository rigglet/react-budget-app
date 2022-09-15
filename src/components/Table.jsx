import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatNumber } from "../utilities";
import { v4 as uuidv4 } from "uuid";


//BUILD GENERIC TABLE COMPONENT
const Table = ({ headings, accumulatedSubTotals, netIncomeForPeriod}) => {
  const { currencySymbol } = useContext(GlobalContext);

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            {headings.map(heading => {
              return (
              <th key={uuidv4()}>
                  <h5>{ heading }</h5>
              </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {accumulatedSubTotals
            .sort((a, b) => (a < b ? 1 : -1))
            .map((item, i) => (
              <tr key={uuidv4()}>
                <td>
                  <p className="category-name">{item.category}</p>
                </td>
                <td>
                  <p>
                    <span className="symbol">{currencySymbol} </span>
                    {formatNumber((item.categoryTotal).toFixed(2))}
                  </p>
                </td>
                <td>
                  <p>
                    <span className="symbol">{currencySymbol} </span>
                    {formatNumber((item.itemTotal).toFixed(2))}
                  </p>
                </td>
                <td>
                  <p>
                    {formatNumber((item.itemTotal / item.categoryTotal * 100).toFixed(2))} %
                  </p>
                </td>
                <td>
                  <p>
                    {formatNumber(((item.itemTotal / netIncomeForPeriod) * 100).toFixed(2))} %
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled(motion.div)`
  width: 100%;

  th {
    text-align: center;
    min-width: 30%;
  }
  td {
    text-align: center;
  }
  .category-name {
    font-variant-caps: all-small-caps;
    font-size: 1.2rem;
  }
`;
