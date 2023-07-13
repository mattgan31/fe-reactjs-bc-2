import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRegionRequest, GetRegionRequest } from "../ReduxSaga/Action/RegionAction";
import FormikSagaRegion from "./FormikSagaRegion";
import FormikSagaRegionUpdate from "./FormixSagaReduxUpdate";
export default function RegionSagaView() {
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.regionState);
  const [display, setDisplay] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState({
    open: false,
    region: {}
  });

  useEffect(() => {
    dispatch(GetRegionRequest());
  }, [refresh]);

  const onDelete = async (id) => {
    window.confirm('Delete ?')
    dispatch(DeleteRegionRequest(id))
    window.alert("Data deleted successfully")
    setRefresh(true)
  }

  return (
    <div>
      {display ? (
        <FormikSagaRegion setDisplay={setDisplay} setRefresh={setRefresh} />
      ) : update.open === true ? (
          <FormikSagaRegionUpdate setRefresh={setRefresh} update={update} setUpdate={setUpdate} />
      ):(
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Region</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {regions &&
                regions.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>
                      <button onClick={() => onDelete(reg.regionId)}>Delete</button>
                      <button onClick={() => setUpdate({open:true, region:reg})}>Update</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
