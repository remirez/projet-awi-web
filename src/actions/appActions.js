import { GET_POSTS, UPDATE_DIMENSIONS } from './types'
import axios from 'axios'

export const getPosts = () => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/posts`)
        .then(
            (res) => {
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: res.data
                    }
                })
                
            },
            (error) =>{
                console.log(error)
            }
        )
}

export const modifierLike = (post, idUser, token, liked) => dispatch => {
    liked ? post.reactions = post.reactions.filter(id => id !== idUser) : post.reactions.push(idUser)
    axios.patch(`${process.env.REACT_APP_URL}/posts/${post._id}`, post, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
        .then(res => { console.log(res); dispatch(getPosts()) })
        .catch(err => console.log(err))
}

export const updateDimensions = (height, width) => dispatch => {
    dispatch({
        type: UPDATE_DIMENSIONS,
        payload: {
            height: height,
            width: width
        }
    })
}