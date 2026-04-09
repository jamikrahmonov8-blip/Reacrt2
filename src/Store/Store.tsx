import { create } from "zustand";

 type User ={
    name:string;
    age:number;
 }
 
type BearStore = {
    bears: object ;
    increase: () => void;
    decrease: () => void;
}

export const useBearStore = create<BearStore>((set) => ({
    bears: [
       
    ],
    increase: () => set((state) => ({ bears: state.bears + 1 })),
    decrease: () => set((state) => ({ bears: state.bears - 1 })),
}));