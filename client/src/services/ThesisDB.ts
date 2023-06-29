import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EventState } from '../reduxFiles/slices/events'
import { ExpenseState } from '../reduxFiles/slices/expenses'
import { ToDoState } from '../reduxFiles/slices/toDos'
import { UserState } from '../reduxFiles/slices/users'
import { ApiResponse } from './ApiResponseType'

// const {data, error, isLoading} = useGetUserQuery("f099247b-189d-4025-81eb-1a53c1e9c332")
// const [addNewUser] = useAddUserMutation()

// const onSubmit = async () => {
//   try {
//     const res = await addNewUser({name: "Xavi3", email: "xavi3@email.com", password: "xavi3"});
//     // console.log((res as { data : ApiResponse<UserState>}).data.data.name)
//   } catch (error) {
//     // console.error(error)
//   }
// }

// console.log("data: ", data);

// someReturn 
// {error ? console.log({error}) : isLoading ? <p>loading...</p> : data ? <h3>{data.data.name}</h3> : <p>couldn't fetch</p>}  

export const thesisDbApi = createApi({
    reducerPath: 'thesisDbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://codeworks-thesis-4063bceaa74a.herokuapp.com/' }),
    tagTypes: ['EventState', 'ExpenseState', 'ToDoState', 'UserState'], //for tracking what will be referenced from the cache
    endpoints: (build) => ({

        //Posts

        // build.mutation has two type parameters, the first is response type the second is parameter type.
        // partial sets all properties to optional for parameter, pick selects which properties should be required for parameter
        addEvent: build.mutation<ApiResponse<EventState>, Partial<EventState> & Pick<EventState, 'eventName'  >>({
            query:(event) => ({
                url: 'newevent/',
                method: 'POST',
                body: event,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),

        addUser: build.mutation<ApiResponse<UserState>, Partial<UserState> & Pick<UserState, 'name' | 'email' | 'password'>>({
            query:(user) => ({
                url: 'register/',
                method: 'POST',
                body: user,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            }),
            invalidatesTags: ['UserState'],
        }),

        addExpense: build.mutation<ApiResponse<ExpenseState>, Partial<ExpenseState> & Pick<ExpenseState, 'value'>>({
            query:(expense) => ({
                url: 'expense/',
                method: 'POST',
                body: expense,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),

        addToDo: build.mutation<ApiResponse<ToDoState>, Partial<ToDoState> & Pick<ToDoState, 'value'>>({
            query:(toDo) => ({
                url: 'todo/',
                method: 'POST',
                body: toDo,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),
        
        joinActivity: build.mutation<ApiResponse<null>, {userId: string, eventId: string}>({
            query:(ids) => ({
                url: 'useractivity/',
                method: 'POST',
                body: ids,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),
        
        logIn: build.mutation<ApiResponse<null>, {email: string, password: string}>({
            query:(credentials) => ({
                url: 'userLogin/',
                method: 'POST',
                body: credentials,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),
       
        //Gets

        //for more complete code and better error handling, refer back to the 
        //and implement the transformErrorResponse, providesTags, OnQueryStarted,
        //transformResponse and OnCacheEntryStarted, 
        //https://redux-toolkit.js.org/rtk-query/usage/queries

        getEvents: build.query<ApiResponse<EventState[]>, string>({
            query: (userId) => ({url:`events/${userId}`}),
        }),

        getEvent: build.query<ApiResponse<EventState>, string>({
            query: (eventId) => ({url:`event/${eventId}`}),
        }),

        getUsers: build.query<ApiResponse<UserState[]>, string>({
            query: (eventId) => ({url:`users/${eventId}`}),
        }),

        getUser: build.query<ApiResponse<UserState>, string>({
            query: (userId) => ({url:`user/${userId}`}),
        }),

        getExpenses: build.query<ApiResponse<ExpenseState[]>, string>({
            query: (eventId) => ({url:`expenses/${eventId}`}),
        }),

        getToDos: build.query<ApiResponse<ToDoState[]>, string>({
            query: (eventId) => ({url:`todos/${eventId}`}),
        }),
        
        logOut: build.query<ApiResponse<null>, null>({
            query: () => ({url:`userlogout`}),
        }),

        //Patches

        updateEvent: build.mutation<ApiResponse<EventState>, Partial<EventState> & Pick<EventState, 'eventId'>>({
            query:({eventId, ...patch}) => ({
                url: `event/${eventId}`,
                method: 'PATCH',
                body: patch,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            })
        }),

        updateUser: build.mutation<ApiResponse<UserState>, Partial<UserState> & Pick<UserState, 'id'>>({
            query:({id, ...patch}) => ({
                url: `user/${id}`,
                method: 'PATCH',
                body: patch,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            }),
        }),
        
        updateToDo: build.mutation<ApiResponse<ToDoState>, Partial<ToDoState> & Pick<ToDoState, 'id'>>({
            query:({id, ...patch}) => ({
                url: `todo/${id}`,
                method: 'PATCH',
                body: patch,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            }),
        }),

        //Deletes

        deleteEvent: build.mutation<ApiResponse<number>, string>({
            query:(id) => ({
                url: `event/${id}`,
                method: 'DELETE',
            })
        }),

        deleteUser: build.mutation<ApiResponse<number>, string>({
            query:(id) => ({
                url: `user/${id}`,
                method: 'DELETE',
            }),
        }),
        
        deleteToDo: build.mutation<ApiResponse<number>, string>({
            query:(id) => ({
                url: `todo/${id}`,
                method: 'DELETE',
            }),
        }),
        
        deleteExpense: build.mutation<ApiResponse<number>, string>({
            query:(id) => ({
                url: `expense/${id}`,
                method: 'DELETE',
            }),
        }),
        
        leaveActivity: build.mutation<ApiResponse<null>, {userId:string,eventId:string}>({
            query:(ids) => ({
                url: `useractivity/`,
                method: 'DELETE',
                body: ids,
                headers: {'Content-type': 'application/json; charset=UTF-8' },
            }),
        }),

    }),
  })

  export const {
    useAddEventMutation,
    useAddExpenseMutation,
    useAddToDoMutation,
    useAddUserMutation,
    useJoinActivityMutation,
    useGetEventQuery,
    useGetEventsQuery,
    useGetExpensesQuery,
    useGetToDosQuery,
    useGetUserQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useUpdateEventMutation,
    useUpdateToDoMutation,
    useDeleteEventMutation,
    useDeleteExpenseMutation,
    useLeaveActivityMutation,
    useDeleteToDoMutation,
    useDeleteUserMutation,
} = thesisDbApi;