import React, { useEffect, useReducer } from "react";

import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "@material-ui/lab/DatePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import basicReducer from "../../lib/basic-reducer";
import api from "../../lib/api";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    textField: {
      width: "100%",
    },
  })
);

const MenuProps = {
  PaperProps: {
    style: {
      width: 400,
    },
  },
};

const initialFilters = {
  // Row #1
  boxes: [],
  catalogs: [],
  kinds: [],
  categories: [],
  // Row #2
  expirationDateFrom: null,
  expirationDateTo: null,
  purchaseDateFrom: null,
  purchaseDateTo: null,
  // Row #3
  valueFrom: null,
  valueTo: null,
  search: "",
};

export const Filters = (props) => {
  const { onSubmit } = props;

  const classes = useStyles();
  const [filters, setFilters] = useReducer(basicReducer, initialFilters);

  const [options, setOptions] = useReducer(basicReducer, {
    boxes: [],
    catalogs: [],
    kinds: ["RECEIPT", "INVOICE", "DOCUMENT"],
    categories: [
      "TAX_OFFICE",
      "CAR",
      "FUEL",
      "OTHER_OFFICE",
      "WARRANTY",
      "HEALTH",
      "COURT",
      "ELECTRONICS",
      "CLOTHES",
    ],
  });

  const fetchBoxes = async () => {
    const { data: boxes } = await api.get("/boxes");

    setOptions({
      boxes,
    });
  };

  const fetchCatalogs = async () => {
    const { data: catalogs } = await api.get("/catalogs");

    setOptions({
      catalogs,
    });
  };

  useEffect(() => {
    fetchBoxes();
    fetchCatalogs();
  }, []);

  const handleMultiselectChange = (fieldName) => (event) => {
    setFilters({
      [fieldName]: event.target.value,
    });
  };

  const handleDateChange = (fieldName) => (date) => {
    setFilters({
      [fieldName]: date,
    });
  };

  const handleChange = (fieldName) => (event) => {
    setFilters({
      [fieldName]: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onSubmit({});
  };

  const handleSubmit = () => {
    const {
      boxes,
      catalogs,
      kinds,
      categories,
      expirationDateFrom,
      expirationDateTo,
      purchaseDateFrom,
      purchaseDateTo,
      valueFrom,
      valueTo,
      search,
    } = filters;

    const finalFilters = {};

    if (boxes.length) {
      Object.assign(finalFilters, {
        boxes,
      });
    }

    if (catalogs.length) {
      Object.assign(finalFilters, {
        catalogs,
      });
    }

    if (kinds.length) {
      Object.assign(finalFilters, {
        kinds,
      });
    }

    if (categories.length) {
      Object.assign(finalFilters, {
        categories,
      });
    }

    if (expirationDateFrom) {
      Object.assign(finalFilters, {
        expirationDateFrom: expirationDateFrom.toISOString(),
      });
    }

    if (expirationDateTo) {
      Object.assign(finalFilters, {
        expirationDateTo: expirationDateTo.toISOString(),
      });
    }

    if (purchaseDateFrom) {
      Object.assign(finalFilters, {
        purchaseDateFrom: purchaseDateFrom.toISOString(),
      });
    }

    if (purchaseDateTo) {
      Object.assign(finalFilters, {
        purchaseDateTo: purchaseDateTo.toISOString(),
      });
    }

    if (valueFrom) {
      Object.assign(finalFilters, {
        valueFrom,
      });
    }

    if (valueTo) {
      Object.assign(finalFilters, {
        valueTo,
      });
    }

    if (search) {
      Object.assign(finalFilters, {
        search,
      });
    }

    onSubmit(finalFilters);
  };

  return (
    <Grid container spacing={3}>
      {/* Row #1 */}
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel>Boxes</InputLabel>
          <Select
            multiple
            value={filters.boxes}
            onChange={handleMultiselectChange("boxes")}
            input={<Input />}
            renderValue={(values) => values.join(", ")}
            MenuProps={MenuProps}
          >
            {options.boxes.map((box) => (
              <MenuItem key={box} value={box}>
                <Checkbox checked={filters.boxes.includes(box)} />
                <ListItemText primary={box} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel>Catalogs</InputLabel>
          <Select
            multiple
            value={filters.catalogs}
            onChange={handleMultiselectChange("catalogs")}
            input={<Input />}
            renderValue={(values) => values.join(", ")}
            MenuProps={MenuProps}
          >
            {options.catalogs.map((catalog) => (
              <MenuItem key={catalog} value={catalog}>
                <Checkbox checked={filters.catalogs.includes(catalog)} />
                <ListItemText primary={catalog} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel>Kinds</InputLabel>
          <Select
            multiple
            value={filters.kinds}
            onChange={handleMultiselectChange("kinds")}
            input={<Input />}
            renderValue={(values) => values.join(", ")}
            MenuProps={MenuProps}
          >
            {options.kinds.map((kind) => (
              <MenuItem key={kind} value={kind}>
                <Checkbox checked={filters.kinds.includes(kind)} />
                <ListItemText primary={kind} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel>Categories</InputLabel>
          <Select
            multiple
            value={filters.categories}
            onChange={handleMultiselectChange("categories")}
            input={<Input />}
            renderValue={(values) => values.join(", ")}
            MenuProps={MenuProps}
          >
            {options.categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={filters.categories.includes(category)} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Row #2 */}
      <Grid item xs={3}>
        <DatePicker
          label="Expiration Date From"
          value={filters.expirationDateFrom}
          onChange={handleDateChange("expirationDateFrom")}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="Expiration Date To"
          value={filters.expirationDateTo}
          onChange={handleDateChange("expirationDateTo")}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="Purchase Date From"
          value={filters.purchaseDateFrom}
          onChange={handleDateChange("purchaseDateFrom")}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="Purchase Date To"
          value={filters.purchaseDateTo}
          onChange={handleDateChange("purchaseDateTo")}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </Grid>
      {/* Row #3 */}
      <Grid item xs={4}>
        <TextField
          label="Value from"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange("valueFrom")}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Value to"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange("valueTo")}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Search query"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange("search")}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleClearFilters}>Clear filters</Button>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleSubmit}>Search</Button>
      </Grid>
    </Grid>
  );
};
