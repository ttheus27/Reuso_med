import reducer from "../../shared/redux/reducer";
import {  configureStore } from "@reduxjs/toolkit";

const store = configureStore( {reducer:reducer});

export default store;
