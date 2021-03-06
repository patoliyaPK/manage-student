import * as ActionTypes from './ActionTypes'
import { browserHistory } from 'react-router';
import {Helpers} from "../var/Helpers";



export function fetchStudent(id){
    return dispatch => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        dispatch({
            type: ActionTypes.CLEAR_ADD_OR_UPDATE
        });
        return  fetch('/api/students/' + id).then((Response) => Response.json()).
                then((response) =>
                {
                    if (!response.success) {
                        throw new Error("There was an error finding your student. Please try again or contact support.");
                    }
                    dispatch({
                        type: ActionTypes.CREATE_OR_EDIT_LOAD_EXISTING,
                        student: response.students
                    });
                })
                .catch((ex)=>{
                    dispatch({type: ActionTypes.ERROR_FETCHING_STUDENT, messages: [{msg: ex.message}]});
                })
    }
}

export function createStudent(student){
    return dispatch => {
        fetch ('/api/students/', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => {
            dispatch ({
                type: ActionTypes.CREATE_STUDENT_SUCCESS,
                messages: [{ msg : "Student successfully created!" }],
                student
            });
            Helpers.redirect('/students');
        }).catch((ex)=>{
            dispatch ({
                type: ActionTypes.CREATE_STUDENT_ERROR,
                messages: [{msg: ex.message}]
            })
        })
    }
}

export function updateStudent(id, student){

    return dispatch => {
        fetch ('/api/students/' + id, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {
                'content-type': 'application/json'
            }

        }).then(() => {
            dispatch ({
                type: ActionTypes.UPDATE_STUDENT_SUCCESS,
                messages: [{ msg : "Successfully updated student!" }],
                student
            });
            Helpers.redirect('/students');
        }).catch((ex)=>{
            dispatch ({
                type: ActionTypes.UPDATE_STUDENT_ERROR,
                messages: [{msg: ex.message}]
            })
        })
    }
}