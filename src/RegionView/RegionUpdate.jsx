import React, { useState, useEffect } from "react";
import RegionApi from "../api/RegionApi";

export default function RegionUpdate(props) {
  const [value, setValue] = useState({
    name: undefined,
  });
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await RegionApi.getById(props.id);
        setValue({name: response.regionName});
      } catch (error) {
        return await error.message;
      }
    };
    fetchRegion()
  }, [props.id])

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };



  const onSubmit = async () => {

    const payload = {
      name: value.name,
    };
    await RegionApi.update(props.id, payload).then(() => {
      props.setRefresh(true);
      window.alert("Data success Update");
    });
  };

  const handleCancel = () => {
    // Panggil fungsi onCancel yang diterima dari properti
    if (props.onCancel) {
      props.onCancel();
    }
  };


  return (
    <div>
      <h2>Update Regions</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Region Name :</label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={value.name}
            onChange={handleChange("name")
            }
          ></input>
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button onClick={handleCancel}>cancel</button>
        </div>
      </form>
    </div>
  );
}
