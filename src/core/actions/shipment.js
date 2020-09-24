import axios from "axios";
import { getURL, urls } from "../../utils/url";

export function fetchShipmentList(key, filterParams) {
  return axios.get(getURL(urls.shipment, filterParams));
}

export function fetchShipmentById(key, shipmentId) {
  return axios.get(`${urls.shipment}/${shipmentId}`);
}

export function editShipment({ id, name }) {
  return axios.patch(`${urls.shipment}/${id}`, { name });
}
