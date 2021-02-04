import { useState } from "react";
import qs from "qs";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

import { Filters } from "./components/filters/filters";
import { Records } from "./components/records/records";
import api from "./lib/api";

function App() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async (filters = {}) => {
    const { data: records } = await api.get(`/?${qs.stringify(filters)}`);

    setRecords(records);
  };

  const handleSubmit = (filters) => {
    fetchRecords(filters);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Filters onSubmit={handleSubmit} />
      <Records records={records} />
    </LocalizationProvider>
  );
}

export default App;
