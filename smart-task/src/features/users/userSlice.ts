import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './types';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  }
);

interface UserState {
  data: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  data: [],
  status: 'idle',
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
