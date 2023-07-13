import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {  UpdateRegionRequest } from "../ReduxSaga/Action/RegionAction";

export default function FormikSagaRegionUpdate(props) {
    const dispatch = useDispatch();
    const { region } = props.update;
    const formik = useFormik({
        initialValues: {
            name: region.regionName,
        },
        onSubmit: async (values) => {
            let payload = new FormData();
            payload.append("name", values.name);
            dispatch(UpdateRegionRequest({ id: region.regionId, payload }));
            props.setUpdate({ ...props.update, open: false });
            window.alert("Data Successfully Update");
            props.setRefresh(true);
        },
  });

  return (
    <div>
        <h2>Update Region</h2>
      <div>
        <label>Region Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        ></input>
      </div>
      <div>
        <div>
          <button type="submit" onClick={formik.handleSubmit}>
            Simpan
          </button>
                  <button type="submit" onClick={(() => props.setUpdate({ open: false, region: {} }))}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
