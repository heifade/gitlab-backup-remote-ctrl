import { Model } from "dva";
import { AnyAction } from "redux";
import { takeRight } from "lodash";

export const NAMESPACE = "wakeUpPage";

export interface IModalState {
  loadding: boolean;
  message: string;
  messageColor: string;
  success: boolean;
}

export default {
  namespace: NAMESPACE,
  state: {
    loadding: false,
    message: "",
    messageColor: "#303030",
    success: undefined
  },
  effects: {
    // *onReceiveMessage({ payload }, { call, put }) {
    //   yield put({
    //     type: "onReceiveMessageDone",
    //     payload: {
    //       msg: payload.msg
    //     }
    //   });
    // },
    // *onFinish({ payload }, { call, put }) {
    //   yield put({
    //     type: "onFinishDone",
    //     payload: {}
    //   });
    // }
  },

  reducers: {
    onStart(state: IModalState, action: AnyAction): IModalState {
      return {
        ...state,
        message: "",
        messageColor: "#303030",
        loadding: true
      };
    },
    onReceiveMessage(state: IModalState, action: AnyAction): IModalState {
      const { msg } = action.payload;
      const lines = String(state.message + msg).split("\n");
      const message = takeRight(lines, 1000).join("\n");

      return {
        ...state,
        message,
        messageColor: "#303030",
        loadding: true
      };
    },
    onFinish(state: IModalState, action: AnyAction): IModalState {
      const success = true;
      return {
        ...state,
        success,
        messageColor: success ? "#156b39" : "#f00000",
        loadding: false
      };
    }
  }
} as Model;
