import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatNumber } from "../../util";
import { v4 as uuidv4 } from "uuid";

//BUILD GENERIC TABLE COMPONENT
const Table = ({ accumulatedSubTotals, data, allocated, total }) => {
  const { currencySymbol } = useContext(GlobalContext);

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th>
              <h5>Category</h5>
            </th>
            <th>
              <h5>Category sub-total</h5>
            </th>
            <th>
              <h5>% of allocated</h5>
            </th>
            <th>
              <h5>% of total</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {accumulatedSubTotals
            //.sort((a, b) => (a < b ? 1 : -1))
            .map((item, i) => (
              <tr key={uuidv4()}>
                <td>
                  <p className="tableItem">{item.category}</p>
                </td>
                <td>
                  <p className="tableItem">
                    <span className="symbol">{currencySymbol} </span>
                    {formatNumber(data[i].toFixed(2))}
                  </p>
                </td>
                <td>
                  <p className="tableItem">
                    {formatNumber((100 / allocated) * data[i])} %
                    {/* {((100 / allocated) * data[i]).toFixed(2)} % */}
                  </p>
                </td>
                <td>
                  <p className="tableItem">
                    {formatNumber((100 / total) * data[i])} %
                    {/* {((100 / total) * data[i]).toFixed(2)}% */}
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
    //min-width: 30%;
  }
`;
