import MaterialTable from "@material-table/core";

const columns = [
  {
    title: "Id",
    field: "_id",
  },
  {
    title: "Box",
    field: "box",
  },
  {
    title: "Catalog",
    field: "catalog",
  },
  {
    title: "Kind",
    field: "kind",
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "Box",
    field: "box",
  },
  {
    title: "Expiration Date",
    field: "expirationDate",
  },
  {
    title: "Purchase Date",
    field: "purchaseDate",
  },
  {
    title: "Value",
    field: "value",
  },
  {
    title: "Tags",
    field: "tags",
    render: ({ tags }) => tags.join(", "),
  },
  {
    title: "Notes",
    field: "notes",
  },
];

const options = {
  paging: false,
  draggable: false,
  search: false,
  sorting: false,
  grouping: false,
  tableLayout: "fixed",
};

export const Records = (props) => {
  const { records } = props;
  return <MaterialTable columns={columns} data={records} options={options} />;
};
