import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store"; // Adjust the import path as needed

export const useAppDispatch: () => AppDispatch = useDispatch;
