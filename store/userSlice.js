import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestHandler from "../utils/requestHandler";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const getData = async () => {
    return requestHandler.get("/users").then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    });
  };
  try {
    return await getData();
  } catch (error) {
    return [];
  }
});

export const setUser = createAsyncThunk("users/setUser", async (data) => {
  const postData = async () => {
    return requestHandler.post("/users", data).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    });
  };
  try {
    return await postData();
  } catch (error) {
    return [];
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  const putData = async () => {
    return requestHandler.put("/users", data.id, data).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    });
  };
  try {
    return await putData();
  } catch (error) {
    return [];
  }
});

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (id) => {
  const deleteData = async () => {
    return requestHandler.delete("/users", id).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    });
  };
  try {
    return await deleteData();
  } catch (error) {
    return [];
  }
});

export const counterSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    allUsers: [],
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, actions) => {
      state.loading = false;
      state.allUsers = actions.payload;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
      state.error = "Network Error !!!";
    },
  },
});

// export const {} = counterSlice.actions;
export default counterSlice.reducer;
