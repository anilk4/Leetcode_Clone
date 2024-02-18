import axios from "axios";
import { BASE_URL } from "../../config";

const token = localStorage.getItem("userToken");

const getUserDetails = async () => {
  try {
    if (!token) {
      console.error("User token is not available");
      return;
    }

    const res = await axios.get(`${BASE_URL}/account/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getComments = async () => {
  if (!token) {
    console.error("User token is not available");
    return;
  }
  const response = await axios.get(
    `${BASE_URL}/comment/getAllComment`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response

};

export const createComment = async (text, parentId = null) => {
  let res = await getUserDetails();
  if (!res) {
    return;
  }

  if (!token) {
    console.error("User token is not available");
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/comment/addComment`,
      {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId: parentId,
        userId: res.data?.user?._id,
        userName: res.data?.user?.name,
        createdDate: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Comment added:", response.data);
  } catch (error) {
    console.error("Error adding comment:", error.message);
  }
};

export const updateComment = async (text,commentId) => {
  if (!token) {
    console.error("User token is not available");
    return;
  }
  const response = await axios.put(
    `${BASE_URL}/comment/updateComment/${commentId}`,
    {text},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response
};

export const deleteComment = async (commentId) => {
  if (!token) {
    console.error("User token is not available");
    return;
  }
  const response = await axios.delete(
    `${BASE_URL}/comment/deleteComment/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response
};
