import React from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import SelectInput from "./SelectInput";
import SelectOptions from "./SelectOptions";
import SelectOption from "./SelectOption";

const DataTableSelect = ({ value, onChange, entries, label }) => (
  <div className="dataTables_length d-flex flex-row">
    <label className="mt-4">{label || "Show entries"}</label>
    <Select getValue={onChange}>
      <SelectInput selected={value} />
      <SelectOptions>
        {entries.map((entry, index) => (
          <SelectOption checked={index === 0} key={entry} value={entry}>
            {entry}
          </SelectOption>
        ))}
      </SelectOptions>
    </Select>
  </div>
);

DataTableSelect.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.number),
  label: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number, 
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default DataTableSelect;
export { DataTableSelect as MDBDataTableSelect };
