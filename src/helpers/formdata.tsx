export type FormDataState = {
    isSuccess: boolean;
    isError: boolean;
};

export interface FormDataPostSuccessAction {
    type: "FORM_DATA_POST_SUCCESS";
}

export interface FormDataPostFailureAction {
    type: "FORM_DATA_POST_FAILURE";
}

export interface FormDataResetStateAction {
    type: "FORM_DATA_RESET_STATE";
}

export type FormDataAction =
    | FormDataPostSuccessAction
    | FormDataPostFailureAction
    | FormDataResetStateAction;

export const formDataReducer = (state: FormDataState, action: FormDataAction) => {
    switch (action.type) {
        case "FORM_DATA_POST_SUCCESS":
            return { ...state, isSuccess: true, isError: false };
        case "FORM_DATA_POST_FAILURE":
            return { ...state, isSuccess: false, isError: true };
        case "FORM_DATA_RESET_STATE":
            return { ...state, isSuccess: false, isError: false };
        default:
            throw new Error();
    }
};

